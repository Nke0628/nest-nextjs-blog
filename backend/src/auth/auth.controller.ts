import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Msg } from './interfaces/auth.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signup(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.authService.login(dto)
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    })
    return {
      message: 'ok',
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    })
    return {
      message: 'ok',
    }
  }
}
