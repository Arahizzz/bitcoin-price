import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User } from '../models/user';

const SAVE_FOLDER = path.join(__dirname, 'authFiles');

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
    async getUser(email: string) {
        const savePath = path.join(SAVE_FOLDER, email);
        const data = await fs.promises.readFile(savePath);
        return JSON.parse(data.toString()) as User;
    }

    async saveUser(user: User) {
        const savePath = path.join(SAVE_FOLDER, user.email);
        if (await exists(savePath))
            throw new Error("User already exists");
        const json = JSON.stringify(user);
        await fs.promises.writeFile(savePath, json);
    }
}
