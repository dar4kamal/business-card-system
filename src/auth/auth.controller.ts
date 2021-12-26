import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentilas.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  adminLogin(@Body() authCredentials: AuthCredentialsDTO) {
    return this.authService.login(authCredentials);
  }
}
