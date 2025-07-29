import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
  standalone: false
})
export class QuestionItemComponent  implements OnInit {
  @Input() title!: string;
  @Input() id?: string;
  constructor(
    private readonly questionService: QuestionService
  ) { }

  ngOnInit() {}

  async onDelete() {
    try {
      await this.questionService.deleteQuestion(this.id as string);
    } catch (error) {
      console.log(error);
    }
  }
}
