import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';

export  class DeleteUserUseCase {
    private _repository: Repository<User>;

    constructor() {
        this._repository = UsersRepository;
    }

    public async execute(id: string): Promise<void> {
        const user = await this._repository.findOneBy({
            id,
        });

        if (!user) return;

        await this._repository.remove(user);
    }
}