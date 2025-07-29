import { Component, Input } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { Question } from 'src/app/interfaces/question';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss'],
  standalone: false
})
export class AddQuestionModalComponent {

  @Input() questionType!: 'text' | 'radio' | 'checkbox';
  questionTitle!: string;
  options: string[] = ['', ''];

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.options.filter(v => v.trim() !== '');
    if((!this.options || this.options.length === 0) && this.questionType !== 'text') {
      return;
    }
    const newQuestion: Question = {
      type: this.questionType,
      title: this.questionTitle,
      createdAt: new Date(),
      order: -1
    }
    return this.modalCtrl.dismiss(newQuestion, 'confirm');
  }

  onQuestionTypeChange(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    this.questionType = target.value;
  }

  addOption() {
    this.options.push('');
  }
}
