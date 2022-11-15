import { Router } from 'express';
import PostsDto from '../dtos/postsDtos';
import CreatePostUseCase from '../useCases/Posts/createPost';
import verifyUser from '../validation/isUserModerador';
import ListPostsUseCase from '../useCases/Posts/listPost';

export const postRoutes = Router();

postRoutes.post('/', async (req, res) => {
  // const { content } = req.body as PostsDto;
  // const { date } = req.body as PostsDto;
  // const verifyUserResponse =  verifyUser(req.body.id, req.body.userId);

  // if (!verifyUserResponse) {
  //   res.status(500).send({message : "Erro ao criar o post"});
  //   return;
  // }
  
  const createPostUseCase = new CreatePostUseCase();

  const response = await createPostUseCase.execute({
    content: req.body.content,
    date: req.body.date,
    userId: req.body.userId
  });

  const { statusCode, data } = response!;

  res.status(statusCode).send(data);
});

postRoutes.get('/', async (req, res) => {
  const listPostsUseCase = new ListPostsUseCase();

  const response = await listPostsUseCase.execute();

  const { statusCode, data } = response!;

  res.status(statusCode).send(data);
});

