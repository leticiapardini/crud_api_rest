import { Repository } from 'typeorm';
import UserDto from '../../dtos/userDtos';
import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';


export  class UpdateUserUseCase {
    private _repository: Repository<User>;

    constructor() {
        this._repository = UsersRepository;
    }

    public async execute({
        id,
        name,
        email,
    }: Omit<UserDto, 'password'>): Promise<User | null> {
       
        const user = await this._repository.findOneBy({
            id,
        });

        if (!user) {
            return null;
        }

        user.name = name;
        user.email = email;
    
        await this._repository.save(user);
        return user;
    }
}