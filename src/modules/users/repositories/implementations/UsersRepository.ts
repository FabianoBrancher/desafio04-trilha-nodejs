import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User(name, email);
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {   
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      return this.users[index];
    }
  }

  findByEmail(email: string): User | undefined {
    const index = this.users.findIndex(user => user.email === email);
    if (index !== -1) {
      return this.users[index];
    }
  }

  turnAdmin(receivedUser: User): User {
    const user = this.users.find(user => user === receivedUser);

    if (user) {
      user.admin = true;
      return user;
    }
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
