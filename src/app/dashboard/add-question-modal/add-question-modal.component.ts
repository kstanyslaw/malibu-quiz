import { Component, Input } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss'],
  standalone: false
})
export class AddQuestionModalComponent {

  @Input() questionType!: string;
  question!: string;
  options: string[] = ['', ''];

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.question, 'confirm');
  }

  onQuestionTypeChange(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    this.questionType = target.value;
  }

  addOption() {
    this.options.push('');
  }
}
