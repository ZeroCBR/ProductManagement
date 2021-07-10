import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-error',
  styleUrls: ['./form-error.component.scss'],
  templateUrl: 'form-error.component.html'
})

export class FormErrorComponent {
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() labelName: string;
}
