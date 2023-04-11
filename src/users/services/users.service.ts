import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { User } from '../models';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor() {
    this.users = {
      ErwinBustillo: {
        name: 'ErwinBustillo',
        id: 'e414b0c3-07ce-4127-b7f6-88145bf8f4a5',
      },
    };
  }

  findOne(userId: string): User {
    return this.users[userId];
  }

  createOne({ name, password }: User): User {
    const id = uuidv4();
    const newUser = { id: name || id, name, password };

    this.users[id] = newUser;

    return newUser;
  }
}
