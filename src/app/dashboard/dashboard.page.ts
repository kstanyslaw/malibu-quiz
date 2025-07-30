import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AddQuestionModalComponent } from './add-question-modal/add-question-modal.component';
import { AlertController, ModalController } from '@ionic/angular';
import { QuestionService } from '../services/question.service';
import { finalize, Subscription } from 'rxjs';
import { Question } from '../interfaces/question';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  isModalOpen = false;
  isLoading = false;
  questionSubscription!: Subscription;
  questions!: Question[];
  newQuestionType!: 'text' | 'radio' | 'checkbox';
  updating: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private modalCtrl: ModalController,
    private readonly questionService: QuestionService,
    private readonly alertController: AlertController,
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

  logout() {
    this.authService.signOut();
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
      componentProps: {
        questionType: newQuestionType,
        mode: mode,
        questionTitle: question?.title,
        questionId: question?.id
      }
    });
    modal.present();
    this.updating = true;

    const { data, role } = await modal.onWillDismiss();

    if (role === 'add') {
      const newQuestionRef = await this.questionService.addQuestion(data);
      this.questions.push({
        ...data,
        id: newQuestionRef.id
      });
    } else if (role === 'edit') {
      const updatedQuestion = await this.questionService.updateQuestion(data, data.id);
      const id = updatedQuestion.id;
      this.questions = this.questions.map((question: Question) => {
        if (question.id === id) {
          return updatedQuestion;
        }
        return question;
      });
    }
    this.updating = false;
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
    this.updating = true;
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
    this.updating = false;
  }

  async onQuestionUpdated(question: Question) {
    await this.openModal(question.type, 'edit', question);
  }
}
