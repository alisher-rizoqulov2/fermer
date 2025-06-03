import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

export class selfguard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

   
    if (req.user.is_creator) {
      return true;
    } else if (req.user.is_creator==false && req.user.id == req.params.id) {
      return true
    } else {
      throw new ForbiddenException({
        message: "Sizga malumotlar taqdim etilmaydi",
      });
    }
  }
}
