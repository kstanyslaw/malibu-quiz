import { Component, Input, OnInit } from '@angular/core';
import { UserAnswers } from '@common/interfaces';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.scss'],
  standalone: false
})
export class AnswerItemComponent  implements OnInit {

  @Input() answer!: UserAnswers;

  constructor() { }

  ngOnInit() {}

}
