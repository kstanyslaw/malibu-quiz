import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '@common/interfaces';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  standalone: false,
})
export class QuestionCardComponent {

  @Input() question!: Question;
  @Output() answerChange = new EventEmitter<string | string[]>();
  @Input() set initialAnswer(value: string | string []) {
    if (this.question.type === 'checkbox') {
      this.selectedOptions = Array.isArray(value) ? [...value] : [];
    } else {
      this.answer = value.toString() || '';
    }
  }

  answer: string = '';

  selectedOptions: string[] = [];

  constructor() {}

  onAnswerChange() {
    this.answerChange.emit(this.answer);
  }

  onCheckboxChange(option: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.selectedOptions.includes(option)) {
        this.selectedOptions.push(option);
      }
    } else {
      this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    }
    this.answerChange.emit(this.selectedOptions);
  }

  isOptionChecked(option: string): boolean {
    return this.selectedOptions.includes(option);
  }
}
