import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { QuestionItemComponent } from './question-item/question-item.component';
import { AddQuestionModalComponent } from './add-question-modal/add-question-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
  ],
  declarations: [
    DashboardPage,
    QuestionItemComponent,
    AddQuestionModalComponent
  ]
})
export class DashboardPageModule {}
