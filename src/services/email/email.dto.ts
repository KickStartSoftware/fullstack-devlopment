export class VerificationEmailDto {
  email!: string;
  token!: string;
}

export class CreateEmailDto {
  email!: string;
  subject!: string;
  text!: string;
  html!: string;
}
