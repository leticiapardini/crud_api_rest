import { Repository } from 'typeorm';
import { Post } from '../../entities/Post';
import { User } from '../../entities/User';
import { PostsRepository } from '../../repositories/PostRepository';
import { UsersRepository } from '../../repositories/UsersRepository';
import PostsDto from '../../dtos/postsDtos';
import HttpResponseDto from '../../dtos/httpResponseDto';

export default class CreatePostUseCase {
  private _postsRepository: Repository<Post>;
  private _usersRepository: Repository<User>;

  constructor() {
    this._usersRepository = UsersRepository;
    this._postsRepository = PostsRepository;
  }


  public async execute({
    content,
    date,
    userId
  }: Omit<PostsDto, 'id'>): Promise<HttpResponseDto | null> {
    const post = new Post();
    post.content = content;
    post.date = date!;
   
    const user = await this._usersRepository.findOne({
      where: { id : userId },
    });

    post.user = user!

    const response = await this._postsRepository
      .save(post)
      .then((): HttpResponseDto<Post> => {
        return { statusCode: 201, data: post };
      })
      .catch((): HttpResponseDto => {
        return { statusCode: 500, data: { error: 'Server Error' } };
      });

    return response;
  }
}