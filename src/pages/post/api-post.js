import { useQuery, useMutation } from "react-query";

const fetchNewsFeedPost = async (_, userId) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const result = await fetch(`http://localhost:5000/posts/feed/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return result.json();
};

export const useNewsFeed = (userId) =>
  useQuery(["news-feed", userId], fetchNewsFeedPost);

// Crear nuevo post
const createPost = async (post) => {
  const { token, _id } = JSON.parse(localStorage.getItem("user"));
  let response = await fetch(`http://localhost:5000/posts/new/${_id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: post,
  });

  return await response.json();
};

export const useCrearNuevoPost = (usuarioAuthId, cache) => {
  return useMutation(createPost, {
    onSuccess: (newPost) => {
      cache.setQueryData(["news-feed", usuarioAuthId], (newsFeedOld) => [
        ...newsFeedOld,
        newPost,
      ]);
      console.log("mutate succes");
    },
  });
};
