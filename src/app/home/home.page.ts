import { Component, OnInit } from '@angular/core';
import { Question } from '@common/interfaces';
import { QuestionService } from '@common/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  isQuestionsListLoading: boolean = false;
  questions!: Question[];
  currentQuestionIndex: number = -1;
  answers: string[] | string[][] = [];

  constructor(
    private readonly questionService: QuestionService,
  ) {}

  ngOnInit(): void {
    // this.isQuestionsListLoading = true;
    // this.questionService
    //   .getQuestions()
    //   .pipe(
    //     finalize(() => {
    //       this.isQuestionsListLoading = false;
    //     })
    //   )
    //   .subscribe({
    //     next: (questions: Question[]) => {
    //       this.questions = questions;
    //     },
    //     error: (err) => {
    //       // this.presentAlert(err.header, err.message);
    //       this.isQuestionsListLoading = false;
    //     },
    //   });

    // Mock questions TO DELETE
    this.questions = [
      {
        type: 'text',
        title: 'Free answer question?😊',
        id: 'yyyyyyyyyy',
        order: 2,
        createdAt: new Date(),
      },
            {
        type: 'checkbox',
        title: 'Ваш любимый кофе, который вы бы хотели пить в нашем офисе?😊',
        id: 'xxxxxxxxx',
        order: 1,
        options: [
          'Американо',
          'Эспрессо',
          'Латте',
          'Капучино'
        ],
        createdAt: new Date(),
      },
      {
        type: 'radio',
        title: 'Ваш любимый кофе, который вы бы хотели пить в нашем офисе?😊',
        id: 'zzzzzzzzzzz',
        order: 1,
        options: [
          'Американо',
          'Эспрессо',
          'Латте',
          'Капучино'
        ],
        createdAt: new Date(),
      },
    ];
  }

  get isQuestionsListEmpty(): boolean {
    return !this.questions || this.questions.length === 0;
  }

  nextQuestion() {
    if( this.currentQuestionIndex < this.questions.length) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion() {
    if( this.currentQuestionIndex > -1) {
      this.currentQuestionIndex--;
    }
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  get currentAnswer() {
    return this.answers[this.currentQuestionIndex] ?? '';
  }

  updateAnswer(value: string | string[]) {
    this.answers[this.currentQuestionIndex] = value;
  }
}
