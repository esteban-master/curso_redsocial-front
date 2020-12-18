import { useAuth } from "../../auth/context/contextAuth";
import { useNewsFeed } from "./api-post";
import NewPost from "./NewPost";
import PostList from "./PostList";
import ManejoError from "../ManejoError";

const NewsFeed = () => {
  const {
    data: { user },
  } = useAuth();
  const { data: posts, isLoading, status, isError, error } = useNewsFeed(
    user._id
  );

  if (isLoading && status === "loading") {
    return "Cargando los posts...";
  }
  if (status === "error" || isError) {
    return <ManejoError error={error} />;
  }
  return (
    <div>
      <h1>News Feed</h1>
      <NewPost />
      <hr />
      {posts && <PostList posts={posts} />}
    </div>
  );
};

export default NewsFeed;
