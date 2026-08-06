import { User } from './user.entity';

/**
 * Armazenamento em memória implementado com o padrão Singleton:
 * o construtor é privado e a única instância existente é obtida
 * através de UserStore.getInstance().
 */
export class UserStore {
  private static instance: UserStore;

  private users: User[] = [];
  private nextId = 1;

  private constructor() {}

  static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  create(name: string, email: string): User {
    const user: User = { id: this.nextId++, name, email };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return [...this.users];
  }

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  remove(id: number): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return undefined;
    }
    const [removed] = this.users.splice(index, 1);
    return removed;
  }
}
