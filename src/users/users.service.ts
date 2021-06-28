import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User } from '../models/user';

const SAVE_FOLDER = path.join(__dirname, '../../', 'auth_files');

async function exists(path) {
    try {
        await fs.promises.access(path)
        return true
    } catch {
        return false
    }
}

exists(SAVE_FOLDER).then(e => { if (!e) fs.promises.mkdir(SAVE_FOLDER) });

@Injectable()
export class UsersService {
    async getUser(username: string) {
        const savePath = this.getFilePath(username);
        const data = await fs.promises.readFile(savePath);
        return JSON.parse(data.toString()) as User;
    }

    async saveUser(user: User) {
        const savePath = this.getFilePath(user.username);
        if (await exists(savePath))
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
        const json = JSON.stringify(user);
        await fs.promises.writeFile(savePath, json);
    }

    private getFilePath(username: string){
        return path.join(SAVE_FOLDER, `${username.toLowerCase()}.json`);
    }
}
