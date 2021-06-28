import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginForm {
    @IsEmail()
    username: string;
    @IsNotEmpty()
    password: string;
}