import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

 export const UsersRepository = AppDataSource.getRepository(User).extend({});

