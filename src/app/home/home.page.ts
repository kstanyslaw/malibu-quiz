import { Component, computed, OnInit, signal } from '@angular/core';
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
  isQuestionsListLoading = signal(false);
  questions = signal<Question[]>([]);
  currentQuestionIndex = signal(-1);
  answers = signal<(string | string[])[]>([]);
  quizFinished = signal(false);
  name = signal('');
  phone = signal('');

  constructor(
    private readonly questionService: QuestionService,
  ) {}

  ngOnInit(): void {
    // this.isQuestionsListLoading.set(true);
    // this.questionService.getQuestions().pipe(
    //   finalize(() => this.isQuestionsListLoading.set(false))
    // ).subscribe({
    //   next: (questions) => {
    //     this.questions.set(questions);
    //     this.answers.set(new Array(questions.length).fill(''));
    //   },
    //     error: (err) => {
    //       // this.presentAlert(err.header, err.message);
    //      this.isQuestionsListLoading.set(false);
    //     },
    //   });

    // Mock questions TO DELETE
    this.questions.set([
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
    ]);
  }

  get isQuestionsListEmpty(): boolean {
    return !this.questions() || this.questions().length === 0;
  }

  nextQuestion() {
    if (this.currentQuestionIndex() < this.questions().length - 1) {
      this.currentQuestionIndex.update(idx => idx + 1);
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex() > -1) {
      this.currentQuestionIndex.update(idx => idx - 1);
    }
  }

  isCurrentQuestionAnswered = computed(() => {
    const currentAnswer = this.answers()[this.currentQuestionIndex()];

    if (!this.currentQuestion()) return false;

    switch (this.currentQuestion().type) {
      case 'checkbox':
        return Array.isArray(currentAnswer) && currentAnswer.length > 0;
      case 'radio':
      case 'text':
        return !!currentAnswer && currentAnswer.toString().trim().length > 0;
      default:
        return false;
    }
  });

  isNextButtonDisabled = computed(() => {
    if (this.currentQuestionIndex() === -1) {
      return this.name().trim() === '' || this.phone().trim() === '';
    }

    const answer = this.answers()[this.currentQuestionIndex()];
    return !answer ||
      (typeof answer === 'string' && answer.trim() === '') ||
      (Array.isArray(answer) && answer.length === 0);
  });

  currentQuestion = computed(() => {
    const idx = this.currentQuestionIndex();
    const q = this.questions()[idx];
    if (!q) throw new Error('Question not found');
    return q;
  });

  get currentAnswer() {
    return this.answers()[this.currentQuestionIndex()] ?? '';
  }

  updateAnswer(value: string | string[]) {
    this.answers.update(answers => {
      const newAnswers = [...answers];
      newAnswers[this.currentQuestionIndex()] = value;
      return newAnswers;
    });
  }

  sendAnswers() {
    this.quizFinished.set(true);
    console.log({
      name: this.name(),
      phone: this.phone(),
      answers: this.answers()
    });
  }

  updateName(value: string) {
    this.name.set(value);
  }

  updatePhone(value: string) {
    this.phone.set(value);
  }
}
