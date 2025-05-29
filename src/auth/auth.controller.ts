import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Request, Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @ApiOperation({ summary: "Admin login qilish" })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli login, access va refresh token qaytariladi",
  })
  @ApiResponse({ status: 401, description: "Login yoki parol noto‘g‘ri" })
  async login(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(LoginDto, res);
  }

  @Get("log-Out")
  @HttpCode(200)
  @ApiOperation({ summary: "Admin logout (chiqish)" })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli chiqildi, cookie tozalandi",
  })
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.signOut(request, response);
  }

  @Get("refresh-token")
  @ApiOperation({ summary: "Refresh token orqali access token yangilash" })
  @ApiCookieAuth() 
  @ApiResponse({ status: 200, description: "Yangi access token qaytarildi" })
  @ApiResponse({
    status: 401,
    description: "Refresh token eskirgan yoki notogri",
  })
  async refreshTokenAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(refreshToken, res);
  }

  @Post("login_user")
  @HttpCode(200)
  async loginUser(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginUser(LoginDto, res);
  }
}







