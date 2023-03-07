import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Request } from 'express'
import { UpdateUserDto } from './dto/user.dto'
import { UserService } from './user.service'

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getLoginuser(@Req() req: Request): Omit<User, 'hashedPassword'> {
    return req.user
  }

  @Patch()
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'hasedPassword'>> {
    return this.userService.updateUser(req.user.id, dto)
  }
}
