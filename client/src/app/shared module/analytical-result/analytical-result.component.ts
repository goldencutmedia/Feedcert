import {Component, Input, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexModule } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

interface FormObject {
  gvo: string;
  substances: { substancename: string; substancevalue: number }[];
}

@Component({
    selector: 'app-analytical-result',
    templateUrl: './analytical-result.component.html',
    styleUrls: ['./analytical-result.component.scss'],
    imports: [FormsModule, FlexModule, GridModule, ReactiveFormsModule, MatFormField, MatInput, NgFor, NgIf, MatMiniFabButton, MatTooltip, MatIcon]
})
export class AnalyticalResultComponent implements OnInit {

  @Input() disabled: boolean = false;
  @Input() formObject!: FormObject;

  analyticForm: FormGroup;
  substanceArray: FormArray;

  constructor(private formBuilder: FormBuilder
  ) {
    this.analyticForm = this.formBuilder.group({
      gvo: [{value: '', disabled: this.disabled}],
      substances: this.formBuilder.array([])
    });
    this.substanceArray = this.analyticForm.get('substances') as FormArray;
  }

  ngOnInit() {
    this.addFormObjects();
    this.addFormListeners();
    if (!this.disabled) {
      this.addSubstance();
    }
  }

  private addFormObjects() {
    if (this.formObject.gvo) {
      this.analyticForm.get('gvo')?.setValue(this.formObject.gvo);
      this.disabled ? this.analyticForm.disable() : this.analyticForm.enable();
    }
    if (this.formObject.substances) {
      for (const substance of this.formObject.substances) {
        this.addSubstance(substance.substancename, substance.substancevalue);
      }
    }
  }

  private addFormListeners() {
    this.analyticForm.get('gvo')?.valueChanges.subscribe(
      value => {
        this.formObject.gvo = value;
      }
    );
    this.analyticForm.get('substances')?.valueChanges.subscribe(
      fields => {
        let value = 0;
        for (const fieldKey in fields) {
          if (fields.hasOwnProperty(fieldKey)) {
            const field = fields[fieldKey];
            value += field.substancevalue;
          }
        }
        this.formObject.substances = fields;
      }
    );
  }

  createSubstance(substancename?: string, substancevalue?: number): FormGroup {
    return this.formBuilder.group({
      substancename: [{value: substancename, disabled: this.disabled}],
      substancevalue: [{value: substancevalue, disabled: this.disabled}]
    });
  }

  addSubstance(substancename?: string, substancevalue?: number): void {
    this.substanceArray.push(this.createSubstance(substancename, substancevalue));
  }

  removeSubstance(index: number): void {
    this.substanceArray.removeAt(index);
  }

  getSubstancesFormGroup(index: number): FormGroup {
    this.substanceArray = this.analyticForm.get('substances') as FormArray;
    const formGroup = this.substanceArray.controls[index] as FormGroup;
    return formGroup;
  }

  get substancesFormGroup() {
    return this.analyticForm.get('substances') as FormArray;
  }

}
