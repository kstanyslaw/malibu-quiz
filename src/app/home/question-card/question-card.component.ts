import { Component, effect, EventEmitter, input, Input, OnInit, output, Output, signal } from '@angular/core';
import { Question } from '@common/interfaces';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  standalone: false,
})
export class QuestionCardComponent {

  question = input.required<Question>();
  initialAnswer = input.required<string | string[]>();
  answerChange = output<string | string[]>();

  answer = signal<string>('');

  selectedOptions = signal<string[]>([]);

  constructor() {
    effect(() => {
      if (this.question().type === 'checkbox') {
        const value = this.initialAnswer();
        this.selectedOptions.set(Array.isArray(value) ? [...value] : []);
      } else {
        const value = this.initialAnswer();
        this.answer.set(typeof value === 'string' ? value : '');
      }
    });
  }

  onAnswerChange() {
    this.answerChange.emit(this.answer());
  }

  onCheckboxChange(option: string, isChecked: boolean) {
    this.selectedOptions.update(options =>
      isChecked
        ? [...options, option]
        : options.filter(item => item !== option)
    );
    this.answerChange.emit(this.selectedOptions());
  }

  isOptionChecked(option: string): boolean {
    return this.selectedOptions().includes(option);
  }
}
