import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionsPageRoutingModule } from './questions-routing.module';

import { QuestionsPage } from './questions.page';
import { QuestionItemComponent } from '../question-item/question-item.component';
import { AddQuestionModalComponent } from '../add-question-modal/add-question-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionsPageRoutingModule
  ],
  declarations: [
    QuestionsPage,
    QuestionItemComponent,
    AddQuestionModalComponent
  ]
})
export class QuestionsPageModule {}
