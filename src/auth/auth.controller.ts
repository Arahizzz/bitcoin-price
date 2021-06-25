import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginForm } from '../models/login_form';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {

    constructor(private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('create')
    async register(@Body() form: LoginForm){
        await this.authService.registerUser(form);
    }
}
