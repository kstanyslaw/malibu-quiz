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

  async openModal(newQuestionType: 'text' | 'radio' | 'checkbox') {
    this.newQuestionType = newQuestionType;
    this.isModalOpen = true;

    const modal = await this.modalCtrl.create({
      component: AddQuestionModalComponent,
      componentProps: {
        questionType: newQuestionType
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const newQuestionRef = await this.questionService.addQuestion(data);
      this.questions.push({
        ...data,
        id: newQuestionRef.id
      });
    }
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

  onQuestionDeleted(deletedId: string) {
    this.questions = this.questions.filter(question => question.id !== deletedId);
  }
}
