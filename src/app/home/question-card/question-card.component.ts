import { Component, Input, OnInit } from '@angular/core';
import { Question } from '@common/interfaces';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  standalone: false,
})
export class QuestionCardComponent {

  @Input() question!: Question;

  constructor() {}
}
