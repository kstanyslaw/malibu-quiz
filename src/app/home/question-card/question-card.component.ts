import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '@common/interfaces';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  standalone: false,
})
export class QuestionCardComponent {

  @Input() question!: Question;
  @Input() answer!: string;
  @Output() answerChange = new EventEmitter<string>();

  selectedOptions: string[] = [];

  constructor() {}

  onAnswerChange() {
    this.answerChange.emit(this.answer);
  }

  onCheckboxChange(option: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    }
    this.answerChange.emit(this.selectedOptions.toString());
  }
}
