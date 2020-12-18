import { useEffect } from "react";
import { useQueryCache } from "react-query";
import { useAuth } from "../../auth/context/contextAuth";
import { useCrearNuevoPost } from "./api-post";

import { FormNewPost } from "./components/FormNewPost";

const NewPost = () => {
  const {
    data: { user },
  } = useAuth();
  const cache = useQueryCache();
  const [createNuevoPost] = useCrearNuevoPost(user._id, cache);

  function clickNuevoPost({ text, photo }) {
    let postData = new FormData();
    postData.append("text", text);
    postData.append("photo", photo);
    createNuevoPost(postData);
  }

  console.log(user);

  useEffect(() => console.log("New Post"));
  return (
    <div>
      <FormNewPost onClickSubmit={clickNuevoPost} />
    </div>
  );
};

export default NewPost;
