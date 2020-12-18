import { Link } from "react-router-dom";
import { useAuth } from "../../auth/context/contextAuth";

const Post = ({ post }) => {
  const { _id: postID, likes, postedBy, text, created } = post;
  const {
    data: { user },
  } = useAuth();
  const checkLike = (likes) => {
    return likes.indexOf(user._id) !== -1;
  };
  function borrarPost() {
    console.log("Borrando post: ", postID);
  }

  return (
    <div>
      <p>
        <Link to={`/usuario/${postedBy._id}`}> {postedBy.name} </Link>
      </p>
      <p> {new Date(created).toDateString()} </p>
      {postedBy._id === user._id && (
        <button onClick={borrarPost}> Borrar </button>
      )}
      <p> {text} </p>
      <p>Likes: {likes.length}</p>
      <div>
        {checkLike(likes) ? <button>UnLike</button> : <button>Like</button>}
      </div>
    </div>
  );
};

export default Post;
