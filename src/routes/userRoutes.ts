import passport  from 'passport';
import { Router } from 'express';
import UserDto from '../../dtos/userDtos';
import { CreateUserUseCase } from '../useCases/Users/createUser';
import { ListUsersUseCase } from '../useCases/Users/listUsers';
import { GetUserUseCase } from '../useCases/Users/getUsers';
import { DeleteUserUseCase } from '../useCases/Users/deleteUser';
import { UpdateUserUseCase } from '../useCases/Users/updateUser';


const userRoutes = Router();

interface userPassword {
  id:  string;
  name: string;
  email: string;
  password?: string;
}

userRoutes.post('/login', async (req, res, next) =>{
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next)
})

userRoutes.post('/', async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body as UserDto;

  const createUserUseCase = new CreateUserUseCase();

  const response = await createUserUseCase.execute({
    name,
    email,
    password,
  });

  const { statusCode , data } = response;

  res.status(statusCode).send(data);
});


userRoutes.get('/', async (req, res, next) => {
  const useCase = new ListUsersUseCase();
  let users : userPassword[] = await useCase.execute();
  users = users.map((x) => {
      delete x.password;
      return x;
  }) ;
  return res.send(users);
});


userRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const useCase = new GetUserUseCase();
  const user: userPassword | null = await useCase.execute(id);

  if (!user) {
      return res.status(404).send();
  }
  delete user.password;
  return res.send(user);
});


userRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const useCase = new DeleteUserUseCase();
  await useCase.execute(id);
  return res.send({});
});


userRoutes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email} = req.body as UserDto;
  const useCase = new UpdateUserUseCase();
  const user : userPassword | null = await useCase.execute({
      id,
      name,
      email,
  });
  delete user!.password;
  return res.send(user);
});

export default userRoutes;