import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AddQuestionModalComponent } from './add-question-modal/add-question-modal.component';
import { ModalController } from '@ionic/angular';
import { QuestionService } from '../services/question.service';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { Question } from '../interfaces/question';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {

  isModalOpen = false;
  questions!: Observable<Question[]>;
  newQuestionType!: 'text' | 'radio' | 'checkbox';

  constructor(
    private readonly authService: AuthService,
    private modalCtrl: ModalController,
    private readonly questionService: QuestionService,
  ) { }

  ngOnInit() {
    this.questions = this.questionService.getQuestions() as Observable<Question[]>;
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
      const newQuestion = await this.questionService.addQuestion(data);
      console.log(newQuestion);
    }
  }
}
