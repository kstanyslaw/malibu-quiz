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
  }

  get isQuestionsListEmpty(): boolean {
    return false; // To DELETE
    return !this.questions || this.questions.length === 0;
  }
}
