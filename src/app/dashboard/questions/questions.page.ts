import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '@common/interfaces';
import { QuestionService } from '@common/services';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { finalize, Subscription } from 'rxjs';
import { AddQuestionModalComponent } from '../add-question-modal/add-question-modal.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
  standalone: false,
})
export class QuestionsPage implements OnInit, OnDestroy {

  isModalOpen = false;
  isLoading = false;
  questionSubscription!: Subscription;
  questions!: Question[];
  newQuestionType!: 'text' | 'radio' | 'checkbox';
  updating: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private readonly questionService: QuestionService,
    private readonly alertController: AlertController,
    private readonly loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.questionSubscription = this.questionService
      .getQuestions()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (questions: Question[]) => {
          this.questions = questions;
        },
        error: (err) => {
          this.presentAlert(err.header, err.message);
          this.isLoading = false;
        },
      });
  }

  handleReorder(event: any) {
        // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  async openModal(
    newQuestionType: 'text' | 'radio' | 'checkbox',
    mode: 'add' | 'edit',
    question?: Question
  ) {
    this.newQuestionType = newQuestionType;
    this.isModalOpen = true;

    const modal = await this.modalCtrl.create({
      component: AddQuestionModalComponent,
      canDismiss: this.modalOnDismiss.bind(this),
      componentProps: {
        questionType: newQuestionType,
        mode: mode,
        questionTitle: question?.title,
        questionId: question?.id,
        options: question?.options ?? ['', ''],
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'add') {
      const loading = await this.showLoading();
      const newQuestionRef = await this.questionService.addQuestion(data);
      this.questions.push({
        ...data,
        id: newQuestionRef.id
      });
      this.hideLoading(loading);
    } else if (role === 'edit') {
      const loading = await this.showLoading();
      await this.questionService.updateQuestion(data, data.id);
      const id = data.id;
      this.questions = this.questions.map((question: Question) => {
        if (question.id === id) {
          return data;
        }
        return question;
      });
      this.hideLoading(loading);
    }
  }

  async modalOnDismiss() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Вы уверены что хотите выйти?',
      buttons: [
        {
          text: 'Да',
          role: 'confirm',
        },
        {
          text: 'Нет',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  }

  ngOnDestroy() {
    if (this.questionSubscription) {
      this.questionSubscription.unsubscribe();
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header ?? 'Ошибка',
      // subHeader: 'A Sub Header Is Optional',
      message: message,
      buttons: ['Закрыть'],
    });

    await alert.present();
  }

  async onQuestionDeleted(deletedId: string) {
    const loading = await this.showLoading();
    try {
      await this.questionService.deleteQuestion(deletedId as string);
      this.questions = this.questions.filter(question => question.id !== deletedId);
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'header' in error && 'message' in error) {
        this.presentAlert((error as any)['header'], (error as any)['message']);
      } else {
        this.presentAlert('Ошибка', 'Произошла неизвестная ошибка');
      }
    }
    this.hideLoading(loading);
  }

  async onQuestionUpdated(question: Question) {
    await this.openModal(question.type, 'edit', question);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Обновляю список...',
      spinner: 'circular',
    });

    loading.present();
    return loading;
  }

  hideLoading(loading: HTMLIonLoadingElement) {
    loading.remove();
  }
}
