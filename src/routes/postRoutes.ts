import { Router } from 'express';
import PostsDto from '../dtos/postsDtos';
import CreatePostUseCase from '../useCases/Posts/createPost';
import verifyUser from '../validation/isUserModerador';
import ListPostsUseCase from '../useCases/Posts/listPost';
import { DeletePostUseCase } from '../useCases/Posts/deletePost';
import { UpdatePostUseCase } from '../useCases/Posts/updatePost';

export const postRoutes = Router();

postRoutes.post('/', async (req, res) => {
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

postRoutes.delete('/:id/:userId/:user', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;
  const { user } = req.params;
  const verifyUserResponse =  verifyUser( user, userId);

  if (!verifyUserResponse) {
    res.status(405).send({message : "Você não é o moderador do post"});
    return;
  }
  
  const postUseCase = new DeletePostUseCase();

  await postUseCase.execute(id);

  res.status(200).send({message: "Post deletado com sucesso!"});
});

postRoutes.put('/:id/:userId/:user', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;
  const { user } = req.params;
  const { content } = req.body;
  const { date } = req.body;
  const verifyUserResponse =  verifyUser( user, userId);

  if (!verifyUserResponse) {
    res.status(405).send({message : "Você não é o moderador do post"});
    return;
  }
  
  const updatePostUseCase = new UpdatePostUseCase();

 const post = await updatePostUseCase.execute({id, content, date});

  res.status(200).send({message: "Post alterado com sucesso!" , content: post});
});

