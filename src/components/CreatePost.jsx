import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [post, setPost] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const createPostHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        title.trim().length === 0 ||
        summary.trim().length === 0 ||
        !coverImage ||
        post.trim().length === 0
      ) {
        alert("Please fill all the fields");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("coverImage", coverImage);
      formData.append("post", post);
      formData.append("authorName", user?.user.username);
      formData.append("authorId", user?.user._id);
      const response = await fetch(
        "http://localhost:3000/api/user/createpost",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={createPostHandler}>
      <input
        type='text'
        value={title}
        name='title'
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
      />
      <input
        type='text'
        value={summary}
        name='summary'
        onChange={(e) => setSummary(e.target.value)}
        placeholder='Summary'
      />
      <input
        type='file'
        name='coverImage'
        accept='.png, .jpg, .jpeg'
        onChange={(e) => setCoverImage(e.target.files[0])}
      />
      <ReactQuill
        modules={modules}
        theme='snow'
        name='post'
        placeholder='Content of your post...'
        onChange={setPost}
      />
      <button type='submit'>Post</button>
    </form>
  );
};

export default CreatePost;
