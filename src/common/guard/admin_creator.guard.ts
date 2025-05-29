import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

export class creatorGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

    if (!req.user.is_creator) {
      throw new ForbiddenException({
        message: "Siz super admin emassiz",
      });
    }

    return true;
  }
}
