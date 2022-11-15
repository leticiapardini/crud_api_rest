
const isUserModerator = ( userId : string  , postId : string ) =>
  userId === postId;

export default isUserModerator;