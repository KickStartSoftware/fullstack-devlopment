import sendgrid from '@sendgrid/mail';
import { config } from '../../config';
import { VerificationEmailDto, CreateEmailDto } from './email.dto';

export class EmailService {
  private sendGridClient: typeof sendgrid = sendgrid;
  private emailClient: string = config.email_client;
  private apiKey: string = config.sendgrid_api_key;
  private origin: string = config.frontend_origin;

  private triggerMailAction() {
    this.sendGridClient.setApiKey(this.apiKey);
  }

  private constructBaseUrl(url: string, token: string, email: string) {
    return `${this.origin}${url}?token=${token}&email=${email}`;
  }

  private async sendEmail(createEmailDto: CreateEmailDto) {
    return this.sendGridClient.send({
      to: createEmailDto.email,
      from: this.emailClient,
      subject: createEmailDto.subject,
      text: createEmailDto.text,
      html: createEmailDto.html,
    });
  }

  public async sendPasswordResetEmail(
    verificationEmailDto: VerificationEmailDto
  ) {
    this.triggerMailAction();
    const baseUrl = this.constructBaseUrl(
      '/auth/reset-password',
      verificationEmailDto.token,
      verificationEmailDto.email
    );
    const html = `<h3>hello from Desktop App!</h3>
        <p>Reset your password</p>
        <p>
         Click this link to <br />
            <a href="${baseUrl}">reset your password</a>
        </p>
        `;
    const createEmailDto: CreateEmailDto = {
      email: verificationEmailDto.email,
      subject: 'Password Reset',
      text: 'Testing mail',
      html,
    };
    return this.sendEmail(createEmailDto);
  }
}
