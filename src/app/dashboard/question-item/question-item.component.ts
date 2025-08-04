import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Question } from 'src/app/common/interfaces/question';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
  standalone: false
})
export class QuestionItemComponent  implements OnInit {
  @Input() title!: string;
  @Input() id!: string;
  @Input() type!: 'text' | 'checkbox' | 'radio';
  @Input() question!: Question;
  @Output() deleted = new EventEmitter<string>();
  @Output() editing = new EventEmitter<Question>();

  constructor() { }

  ngOnInit() {}

  onDelete(slidingItem: IonItemSliding) {
    this.deleted.emit(this.id);
    slidingItem.close();
  }

  onEdit(slidingItem: IonItemSliding) {
    this.question.id = this.id;
    this.editing.emit(this.question);
    slidingItem.close();
  }
}
