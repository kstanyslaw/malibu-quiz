import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-first-question-card',
  templateUrl: './first-question-card.component.html',
  styleUrls: ['./first-question-card.component.scss'],
  standalone: false,
})
export class FirstQuestionCardComponent  implements OnInit {

  @Output() nameChange = new EventEmitter<string>();
  @Output() phoneChange = new EventEmitter<string>();
  @Input() name!: string;
  @Input() phone!: string;

  constructor() { }

  ngOnInit() {}

  onNameChange() {
    this.nameChange.emit(this.name);
  }

  onPhoneChange() {
    this.phoneChange.emit(this.phone);
  }

}
