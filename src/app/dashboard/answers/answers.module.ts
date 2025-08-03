import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswersPageRoutingModule } from './answers-routing.module';

import { AnswersPage } from './answers.page';
import { HeaderComponent } from "../header/header.component";
import { AnswerItemComponent } from '../answer-item/answer-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswersPageRoutingModule,
    HeaderComponent
],
  declarations: [
    AnswersPage,
    AnswerItemComponent
  ]
})
export class AnswersPageModule {}
