import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { QuestionCardComponent } from './question-card/question-card.component';
import { FirstQuestionCardComponent } from './first-question-card/first-question-card.component';
import { LastQuestionCardComponent } from './last-question-card/last-question-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    QuestionCardComponent,
    FirstQuestionCardComponent,
    LastQuestionCardComponent
  ]
})
export class HomePageModule {}
