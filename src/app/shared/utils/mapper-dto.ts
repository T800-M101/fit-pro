import { RegisterUserDto } from '../../interfaces/register-user.interface';

export function mapperDto(formValue: any): RegisterUserDto {
  return {
    fullName: formValue.name.toLowerCase(),
    username: formValue.username.toLowerCase(),
    email: formValue.email,
    phone: formValue.phone,
    password: formValue.password,
    gender: formValue.gender.toLowerCase(),
    membershipType: formValue.membership.toLowerCase(),
    role: formValue.role.toLowerCase()
  };
}
