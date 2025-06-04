import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

export class userIschiGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

    if (req.user.is_creator) {
      return true;
    } else if (req.user.is_active && req.user.role=="ishchi" || req.user.role=="admin") {
      return true;
    } else {
      throw new ForbiddenException({
        message:
          "Siz actif emassiz yoki malumotlaringgiz noto'g'ri iltimos qayta urunib ko'rin",
      });
    }

    return true;
  }
}
