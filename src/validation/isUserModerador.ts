import { User } from '../entities/User';
import { Post } from '../entities/Post'

interface IsUserModeratorProps {
  user: User;
}

interface IsPostModeratorProps {
  post: Post;
}

const isUserModerator = ( userId : number  , postId : number ) =>
  userId === postId;

export default isUserModerator;