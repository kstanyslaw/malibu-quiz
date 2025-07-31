import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'questions',
        loadChildren: () => import('./questions/questions.module').then( m => m.QuestionsPageModule)
      },
      {
        path: 'answers',
        loadChildren: () => import('./answers/answers.module').then( m => m.AnswersPageModule)
      },
      {
        path: '',
        redirectTo: 'questions',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
