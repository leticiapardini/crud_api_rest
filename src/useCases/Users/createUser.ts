import { Repository } from "typeorm";
import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/UsersRepository";
import UserDto from "../../dtos/userDtos";
import HttpResponseDto from "../../dtos/httpResponseDto";
import { emailPattern } from "../../utils/regex";


export class CreateUserUseCase {
  private _usersRepository: Repository<User>;
  constructor() {
    this._usersRepository = UsersRepository;
  }

  public async execute({
    name,
    email,
    password,
  }: Omit<UserDto, "id">): Promise<HttpResponseDto> {
    if (!name) {
      return {
        statusCode: 400,
        data: { field: "name", message: "Name is required!" },
      };
    }

    if (!email) {
      return {
        statusCode: 400,
        data: { field: "email", message: "E-mail is required!" },
      };
    }

    if (!password) {
      return {
        statusCode: 400,
        data: { field: "password", message: "Password is required!" },
      };
    }

    if (!emailPattern.test(email)) {
      return {
        statusCode: 400,
        data: { field: "email", message: "E-mail is invalid!" },
      };
    }

    const countUserByEmail = await this._usersRepository.count({
      where: { email },
    });

    if (countUserByEmail) {
      return {
        statusCode: 400,
        data: { field: "email", message: "E-mail is already in use!" },
      };
    }

    if (!password) {
      return {
        statusCode: 400,
        data: { field: "password", message: "Password is required!" },
      };
    }

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
        return { statusCode: 500, data: { error: "Server Error" } };
      });

    return response;
  }
}
