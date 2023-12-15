import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const EditPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(state);
  const [title, setTitle] = useState(() => {
    return state.title ? state.title : "";
  });
  const [summary, setSummary] = useState(() => {
    return state.summary ? state.summary : "";
  });
  const [post, setPost] = useState(() => {
    return state.post ? state.post : "";
  });
  const editPostHandler = async (e) => {
    e.preventDefault();
    try {
      if (title.trim().length === 0 || summary.trim().length === 0) {
        alert("Please fill all the fields");
        return;
      }
      const response = await fetch(
        `https://react-blog-backend-pshn.onrender.com/api/edit-post/${state._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ title, summary, post }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={editPostHandler}>
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
      <ReactQuill
        modules={modules}
        theme='snow'
        name='post'
        placeholder='Content of your post...'
        onChange={setPost}
        value={post}
      />
      <button type='submit'>Update Post</button>
    </form>
  );
};

export default EditPage;
