import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordKey)?.value;
    const confirmPassword = formGroup.get(confirmPasswordKey)?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };
}