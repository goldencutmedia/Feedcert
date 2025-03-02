import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RegisterService} from "../register.service";
import {ActivatedRoute} from "@angular/router";
import { FlexModule } from '@angular/flex-layout/flex';
import { GridModule } from '@angular/flex-layout/grid';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass, NgIf } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [FlexModule, GridModule, MatCard, FormsModule, ReactiveFormsModule, MatCardContent, MatFormField, MatInput, NgClass, ExtendedModule, NgIf, MatError, MatCardActions, MatButton]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  companyId: string | undefined;
  company: string = '';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private registerservice: RegisterService
  ) {
  }

  ngOnInit() {
    const companyId = this.registerservice.getCompany();

    this.registerForm = this.formBuilder.group({
      companyId: [companyId, Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const values = this.registerForm.value;
    this.registerservice.register(values.username, values.password, values.companyId);
  }

  // custom validator to check that two fields match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}
