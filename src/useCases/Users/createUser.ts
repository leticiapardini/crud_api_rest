import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';
import UserDto from '../../dtos/userDtos';
import HttpResponseDto from '../../dtos/httpResponseDto';

export  class CreateUserUseCase {
  private _usersRepository: Repository<User>;
  constructor() {
    this._usersRepository = UsersRepository;
  }

  public async execute({
    name,
    email,
    password,
  }: Omit<UserDto, 'id'>): Promise<HttpResponseDto> {
    
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
  
    const response = await this._usersRepository
      .save(user)
      .then((): HttpResponseDto<User> => {
        return { statusCode: 201, data: user };
      })
      .catch((): HttpResponseDto => {
        return { statusCode: 500, data: { error: 'Server Error' } };
      });

    return response;
  }
}