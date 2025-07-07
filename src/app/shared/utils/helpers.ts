import { FormGroup } from '@angular/forms';

export function isInvalid(controlName: string, form: FormGroup): boolean {
  const control = form.get(controlName);
  return !!(control && control.invalid && (control.touched || control.dirty));
}

export function getErrorMessage(controlName: string, form: FormGroup): string {
  const control = form.get(controlName);
  if (!control || !control.errors) return '';

  if (control.errors['required']) {
    switch (controlName) {
      case 'name':
        return 'Name is required';
      case 'username':
        return 'Username is required';
      case 'email':
        return 'Email is required';
      case 'phone':
        return 'Phone is required';
      case 'gender':
        return 'Please select a gender';
      case 'password':
        return 'Password is required';
      case 'confirmPassword':
        return 'Please confirm your password';
      case 'membership':
        return 'Please select a membership';
      case 'duration':
      return 'Please select a membership duration';
      default:
        return 'This field is required';
    }
  }

  if (control.errors['email']) return 'Invalid email format';

  if (control.errors['minlength']) {
    const requiredLength = control.errors['minlength'].requiredLength;
    return `Minimum length is ${requiredLength} characters`;
  }

  if (control.errors['maxlength']) {
    const requiredLength = control.errors['maxlength'].requiredLength;
    return `Maximum length is ${requiredLength} characters`;
  }

  if (control.errors['pattern']) {
    switch (controlName) {
      case 'phone':
        return 'Phone number must be valid (e.g., +1234567890)';
      default:
        return 'Invalid format';
    }
  }

  return 'Invalid input';
}
