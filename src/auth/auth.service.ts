import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginForm } from '../models/login_form';
import { User } from '../models/user';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/jwt_payload';

@Injectable()
export class AuthService {

    constructor(private users: UsersService, private jwtService: JwtService) { }

    async registerUser(form: LoginForm) {
        const user: User = {
            email: form.email,
            hash: await bcrypt.hash(form.password, 10)
        }
        await this.users.saveUser(user);
    }

    async checkLogin(login: string, password: string): Promise<JwtPayload | null> {
        const user = await this.users.getUser(login);
        if (await bcrypt.compare(password, user.hash))
            return { email: login };
        return null;
    }

    async login(user: JwtPayload | null) {
        return {
            access_token: this.jwtService.sign(user),
        };
    }
}
