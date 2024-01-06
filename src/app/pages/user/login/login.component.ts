import {Component} from '@angular/core';
import {NzFormControlComponent, NzFormItemComponent, NzFormModule} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {AuthService} from "../../../core/auth/auth.service";
import {log} from "ng-zorro-antd/core/logger";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonComponent,
    NzCheckboxComponent,
    NzInputDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginInput: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  constructor(private fb: NonNullableFormBuilder, private authService: AuthService) {
  }

  submitForm(): void {
    this.authService.login(this.loginInput.value)
  }
}
