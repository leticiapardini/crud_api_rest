import { Repository } from 'typeorm';
import PostsDto from '../../../dtos/postsDtos';
import { Post } from '../../entities/Post';
import { PostsRepository } from '../../repositories/PostRepository';


export  class UpdatePostUseCase {
    private _repository: Repository<Post>;

    constructor() {
        this._repository = PostsRepository;
    }

    public async execute({
        id,
        content,
        date
    }: Omit<PostsDto, 'userId'>): Promise<Post | null> {
       
        const post = await this._repository.findOneBy({
            id,
        });

        if (!post) {
            return null;
        }

        post.content = content;
        post.date = date!;
      
    
        await this._repository.save(post);
        return post;
    }
}