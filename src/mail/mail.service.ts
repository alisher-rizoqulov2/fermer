import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationRequestToAdmin(user: User) {
    const url = `${process.env.API_HOST}/api/auth/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: process.env.ADMIN_EMAIL, // admin emaili
      subject: "Yangi foydalanuvchini tasdiqlash so‘rovi",
      template: "confirmation",
      context: {
        name: user.first_name,
        email: user.email,
        url,
      },
    });
  }
}
