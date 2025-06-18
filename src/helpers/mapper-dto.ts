import { RegisterUserDto } from "../app/interfaces/register-user.interface";

export function mapperDto(formValue: any): RegisterUserDto {
  return {
    fullName: formValue.name,
    username: formValue.username,
    email: formValue.email,
    phone: formValue.phone,
    password: formValue.password,
    gender: formValue.gender,
    membershipType: formValue.membership
  };
}