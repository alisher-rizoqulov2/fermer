import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { Request, Response } from "express";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";
import { Admin } from "../admin/entities/admin.entity";
import * as bcrypt from "bcrypt";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService
  ) {}
  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      email: admin.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async generateTokensUser(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      email: user.email,
      role: user.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async loginAdmin(loginDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const validPasswor = await bcrypt.compare(
      loginDto.password,
      admin.password
    );
    if (!validPasswor) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const tokens = await this.generateTokens(admin);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    admin.hashed_refresh_token = hashed_refresh_token;

    return {
      message: "Xush kelibsiz",
      adminId: admin.id,
      accessToken: tokens.accessToken,
    };
  }
  async signOut(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;
    console.log(refresh_token);
    if (!refresh_token) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }

    const user = await this.jwtService.verifyAsync(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!user) {
      throw new BadRequestException("Token topilmadi");
    }

    const adminData = await this.adminService.findOne(user.id);
    if (!adminData) {
      throw new BadRequestException("Bunday Tokenli shaxs topilmadi");
    }

    await this.adminService.updateToken(user.id, {
      hashed_refresh_token: "",
    });

    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }
  async refreshTokenAdmin(refresh_token: string, res: Response) {
    try {
      const admin = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const admindata = await this.adminService.findOne(admin.id);

      if (!admindata) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generateTokens(admindata);

      const newToken = (admindata.hashed_refresh_token = await bcrypt.hash(
        tokens.refreshToken,
        7
      ));
      await this.adminService.updateToken(admindata.id, {
        hashed_refresh_token: newToken,
      });
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_TIME),
      });

      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }
  //====================================User==========================

  async loginUser(loginDto: LoginDto, res: Response) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const validPasswor = await bcrypt.compare(loginDto.password, user.password);
    if (!validPasswor) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const tokens = await this.generateTokensUser(user);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    user.hashed_refresh_token = hashed_refresh_token;

    return {
      message: "Xush kelibsiz",
      userId: user.id,
      accessToken: tokens.accessToken,
    };
  }

  async signOutUser(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException("Ro'yxatdan o'tilmagan");
    }
    const user = await this.jwtService.verifyAsync(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!user) {
      throw new BadRequestException("Token topilmadi");
    }
    const userData = await this.usersService.findOne(user.id);
    if (!userData) {
      throw new BadRequestException("Bunday Tokenli shaxs topilmadi");
    }
    await this.usersService.updateToken(user.id, {
      hashed_refresh_token: "",
    });
    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }
  async refreshTokenUser(refresh_token: string, res: Response) {
    try {
      const user = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const userdata = await this.usersService.findOne(user.id);

      if (!userdata) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generateTokensUser(userdata);

      const newToken = (userdata.hashed_refresh_token = await bcrypt.hash(
        tokens.refreshToken,
        7
      ));
      await this.usersService.updateToken(userdata.id, {
        hashed_refresh_token: newToken,
      });
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_TIME),
      });

      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }

  async activatePatient(link: string) {
    if (!link) {
      throw new BadRequestException({ message: "Activation link not found" });
    }

    const updatedUser = await this.usersService.activateUserByLink(link);

    if (!updatedUser.is_active) {
      throw new BadRequestException({ message: "User already activated" });
    }
    
    return {
      message: "User Activated Successfully",
      is_active: updatedUser.is_active,
    };
  }
}
