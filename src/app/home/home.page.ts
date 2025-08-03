import { Component, computed, OnInit, signal } from '@angular/core';
import { Question } from '@common/interfaces';
import { AnswersService, QuestionService } from '@common/services';
import { AlertController } from '@ionic/angular';
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
  isFormValid = signal(false);

  constructor(
    private readonly questionService: QuestionService,
    private readonly answersService: AnswersService,
    private readonly alertController: AlertController,
  ) {}

  ngOnInit(): void {
    this.isQuestionsListLoading.set(true);
    this.questionService.getQuestions().pipe(
      finalize(() => this.isQuestionsListLoading.set(false))
    ).subscribe({
      next: (questions) => {
        this.questions.set(questions);
        this.answers.set(new Array(questions.length).fill(''));
      },
        error: (err) => {
          // this.presentAlert(err.header, err.message);
         this.isQuestionsListLoading.set(false);
        },
      });

    // Mock questions TO DELETE
    // this.questions.set([
    //   {
    //     type: 'text',
    //     title: 'Free answer question?😊',
    //     id: 'yyyyyyyyyy',
    //     order: 2,
    //     createdAt: new Date(),
    //   },
    //   {
    //     type: 'checkbox',
    //     title: 'Ваш любимый кофе, который вы бы хотели пить в нашем офисе?😊',
    //     id: 'xxxxxxxxx',
    //     order: 1,
    //     options: [
    //       'Американо',
    //       'Эспрессо',
    //       'Латте',
    //       'Капучино'
    //     ],
    //     createdAt: new Date(),
    //   },
    //   {
    //     type: 'radio',
    //     title: 'Ваш любимый кофе, который вы бы хотели пить в нашем офисе?😊',
    //     id: 'zzzzzzzzzzz',
    //     order: 1,
    //     options: [
    //       'Американо',
    //       'Эспрессо',
    //       'Латте',
    //       'Капучино'
    //     ],
    //     createdAt: new Date(),
    //   },
    // ]);
  }

  get isQuestionsListEmpty(): boolean {
    return !this.questions() || this.questions().length === 0;
  }

  nextQuestion() {
    // store personal info to LS
    if (this.currentQuestionIndex() === -1) {
      this.answersService.savePersonalInfoLS(this.name(), this.phone());
    } else {
    // store user answer in LS
      this.answersService.saveAnswerLS(this.currentQuestion(), this.currentAnswer);
    }
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
      return !this.isFormValid();
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

  async sendAnswers() {
    const action = await this.presentAlert(
      'Отправить ответы?',
      'Вы можете их проверить и изменить, если хотите'
    );
    if (action === 'send') {
      this.answersService.saveAnswerLS(this.currentQuestion(), this.currentAnswer);
      this.quizFinished.set(true);
      const questionIds = this.questions().map(q => q.id as string);
      this.answersService.addUserAnswers(questionIds);
    }
  }

  onPersonalInfoChange(values: {name: string, phone: string}) {
    this.name.set(values.name);
    this.phone.set(values.phone);
  }

  async presentAlert(header: string, message: string, subHeader?: string) {
    const alert = await this.alertController.create({
      header: header ?? 'Ошибка',
      // subHeader: subHeader ?? '',
      message: message,
      buttons: [{text: 'Вернуться', role: 'cancel'}, {text: 'Отправить', role: 'send'}],
    });

    await alert.present();

    const { role } = await alert.onWillDismiss();
    return role;
  }
}
