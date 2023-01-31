export class AuthDto {
  email!: string;
  password!: string;
  username!: string;
  constructor({ email, password, username }: any) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}

export class AuthResetPasswordDto {
  email!: string;
  token!: string;
  password!: string;
  constructor({ email, password, token }: any) {
    this.email = email;
    this.token = token;
    this.password = password;
  }
}
