import { Repository } from 'typeorm';
import { Post } from '../../entities/Post';
import { PostsRepository } from '../../repositories/PostRepository';
import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';

export  class DeletePostUseCase {
    private _repository: Repository<Post>;
    private _repository_user: Repository<User>;

    constructor() {
        this._repository = PostsRepository;
        this._repository_user = UsersRepository;
    }

    public async execute(id :string): Promise<void> {

        const post = await this._repository.findOneBy({id});

        if (!post) return;

        await this._repository.remove(post);
    }
}