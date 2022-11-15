import { AppDataSource } from "../data-source";
import { Post } from "../entities/Post";

export const PostsRepository = AppDataSource.getRepository(Post).extend({});

