import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
  standalone: false
})
export class BaseFormComponent implements OnInit {
  @Input() formData!: {
    fields: [
      {
        type: string,
        name: string,
        label: string,
        lines: number,
        span: number,
        required: boolean,
        readOnly: boolean,
        hidden: boolean,
        tab: string,
        options: [
          {
            label: string,
            value: string
          }
        ]
      }
    ],
    buttons: []
  };
  @Input() formObject: any;
  @Input() readOnly: any;
  @Input() buttons: any;

  @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chipAuto') chipAutocomplete!: MatAutocomplete;

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() ok: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() showPdf: EventEmitter<any> = new EventEmitter();
  @Output() sendMail: EventEmitter<any> = new EventEmitter();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipCtrl = new FormControl();


  constructor(private router: Router) {
  }

  ngOnInit() {
    if (!this.buttons && this.formData.buttons) {
      this.buttons = this.formData.buttons;
    }
  }

  onCancel() {
    this.cancel.emit(null);
  }

  onSave() {
    this.save.emit(null);
  }

  onAdd() {
    this.save.emit(null);
  }

  onOk() {
    this.ok.emit(null);
  }

  onDelete() {
    this.delete.emit(null);
  }

  onShowPdf() {
    this.showPdf.emit(null);
  }

  onSendMail() {
    this.sendMail.emit(null);
  }

  onChipAdded(event: MatChipInputEvent, formObjectElement: string[]) {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      formObjectElement.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.chipCtrl.setValue(null);
  }

  onChipSelected(event: MatAutocompleteSelectedEvent, formObjectElement: string[]) {
    formObjectElement.push(event.option.viewValue);
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);
  }

  onChipRemoved(object: string, formObjectElement: string[]) {
    const index = formObjectElement.indexOf(object);

    if (index >= 0) {
      formObjectElement.splice(index, 1);
    }
  }
}
