import Post from "./Post";

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((item) => (
        <Post post={item} key={item._id} />
      ))}
    </div>
  );
};

export default PostList;
