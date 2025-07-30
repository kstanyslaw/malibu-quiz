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
        type: 'text',
        title: 'Free answer question?😊',
        id: 'yyyyyyyyyy',
        order: 2,
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
    ]
  }

  get isQuestionsListEmpty(): boolean {
    return false; // To DELETE
    return !this.questions || this.questions.length === 0;
  }
}
