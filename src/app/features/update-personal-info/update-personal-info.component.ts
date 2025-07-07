import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getErrorMessage, isInvalid } from '../../shared/utils/helpers';
import { UsersService } from '../../shared/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { UpdatedUser } from '../../interfaces/updated-user.interface';

@Component({
  selector: 'app-update-personal-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-personal-info.component.html',
  styleUrl: './update-personal-info.component.scss',
})
export class UpdatePersonalInfoComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputConfirm')
  passwordInputConfirm!: ElementRef<HTMLInputElement>;
  updateForm!: FormGroup;
  isInvalid = isInvalid;
  getErrorMessage = getErrorMessage;

  constructor(private fb: FormBuilder, private userService: UsersService, private toastr: ToastrService) {}

  ngOnInit(): void {

    this.updateForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
    password: [''], 
    confirmPassword: [''],
    },
    { validators: this.optionalPasswordMatchValidator }
  );
   
    this.userService.findUserById().subscribe({
    next: (data: any) => {
      this.updateForm.patchValue({
        name: data.name,
        email: data.email,
        phone: data.phone
      });
    },
    error: (error) => {
      console.error(error);
    }
  });

  }

  onSubmit(): void {
    if (this.updateForm.invalid) return;

    const formValue = this.updateForm.value;

  const payload: any = {
    name: formValue.name,
    email: formValue.email,
    phone: formValue.phone
  };


  if (formValue.password && formValue.password.trim() !== '') {
    payload.password = formValue.password;
  }


  this.userService.updateUser(payload).subscribe({
    next: (response: UpdatedUser) => {
      this.toastr.success('User updated successfully!');
    },
    error: (error) => {
      this.toastr.success('User could not be updated!');
    }
  });

  }

  togglePassword(msg: string): void {
    if (msg === 'password') {
      const input = this.passwordInput.nativeElement;
      input.type = input.type === 'password' ? 'text' : 'password';
    }
    if (msg === 'confirm') {
      const input = this.passwordInputConfirm.nativeElement;
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  optionalPasswordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  const hasPassword = !!password?.trim();
  const hasConfirm = !!confirmPassword?.trim();

  if (!hasPassword && !hasConfirm) {
    // No password update — clear errors
    form.get('password')?.setErrors(null);
    form.get('confirmPassword')?.setErrors(null);
    return null;
  }

  if (hasPassword && hasConfirm && password === confirmPassword) {
    // Valid password change
    form.get('password')?.setErrors(null);
    form.get('confirmPassword')?.setErrors(null);
    return null;
  }

  // Error: passwords must match
  form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  return { passwordMismatch: true };
}
}
