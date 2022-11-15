import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';

export  class ListUsersUseCase {
    private _repository: Repository<User>;

    constructor() {
        this._repository = UsersRepository;
    }

    public async execute(): Promise<User[]> {
        return await this._repository.find({
            relations: {
                posts: true
            },
        });
    }
}