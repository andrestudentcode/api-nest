import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStore } from './user-store';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly store = UserStore.getInstance();

  create(dto: CreateUserDto): User {
    return this.store.create(dto.name, dto.email);
  }

  findAll(): User[] {
    return this.store.findAll();
  }

  findOne(id: number): User {
    const user = this.store.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    return user;
  }

  remove(id: number): User {
    const removed = this.store.remove(id);
    if (!removed) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    return removed;
  }
}
