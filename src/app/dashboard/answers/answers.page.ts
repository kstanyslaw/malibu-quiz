import { Component, inject, OnInit } from '@angular/core';
import { UserAnswers } from '@common/interfaces';
import { AnswersService } from '@common/services';
import { AlertController } from '@ionic/angular';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
  standalone: false,
})
export class AnswersPage implements OnInit {
  answerSubscription!: Subscription;
  answers!: UserAnswers[];
  isLoading: boolean = false;

  answersService = inject(AnswersService);
  alertController = inject(AlertController);

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    this.answerSubscription = this.answersService
      .getUsersAnswers()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (answers: UserAnswers[]) => {
          this.answers = answers;
        },
        error: (err) => {
          this.presentAlert(err.header, err.message);
          this.isLoading = false;
        },
      });
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

}
