import { AuthContext } from "../context/AuthContext";
import Post from "./Post";
import { useState, useEffect, useContext } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  // console.log(user.token);
  // const { user } = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch("http://localhost:3000/api/all-posts", {
        method: "GET",
      });
      const posts = await response.json();
      if (response.ok) {
        // console.log(posts);
        setPosts(posts);
      } else {
        console.log("failed to fetch");
      }
    };
    return () => {
      getAllPosts();
    };
  }, []);
  return (
    <div>
      {posts?.length > 0 && (
        <>
          {posts?.map((post, i) => {
            return <Post {...post} key={i} />;
          })}
        </>
      )}
    </div>
  );
};

export default HomePage;
