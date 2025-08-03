import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-question-card',
  templateUrl: './first-question-card.component.html',
  styleUrls: ['./first-question-card.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstQuestionCardComponent  implements OnInit, OnChanges {

  name = input<string>('');
  phone = input<string>('');
  formValueChange = output<{ name: string; phone: string }>();
  formValid = output<boolean>();

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]]
  });

  private previousValidState: boolean | null = null;
  constructor(private fb: FormBuilder) {
    effect((onCleanup) => {
      const sub = this.form.valueChanges.subscribe(() => {
        const currentValid = this.form.valid;
        if (currentValid !== this.previousValidState) {
          this.formValid.emit(currentValid);
          this.previousValidState = currentValid;
        }

        if (currentValid) {
          this.formValueChange.emit(this.form.value);
        }
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  ngOnInit():void {
    this.form.patchValue({
      name: this.name(),
      phone: this.phone()
    });
  }

  ngOnChanges(changes: SimpleChanges):void {
    this.form.patchValue({
      name: this.name(),
      phone: this.phone()
    }, { emitEvent: false });
  }
}
