import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(state);
  // console.log(user.user);
  const deletePost = async (id) => {
    const response = await fetch(
      `https://react-blog-backend-pshn.onrender.com/api/delete-post/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data) {
      alert("Post deleted!");
      navigate("/");
    }
  };
  return (
    <div className='post-page'>
      <div className='title__author__container'>
        <h3 style={{ color: "#3081D0", margin: 0 }}>{state.title}</h3>
        <div className='time__author'>
          <time>{new Date(state.createdAt).toDateString("en-GB")}</time>
          <div className='author'>By @{state.authorName}</div>
          {user?.user?.username === state.authorName && (
            <>
              <Link
                className='edit-btn'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  backgroundColor: "#3081D0",
                  color: "white",
                  padding: 5,
                  borderRadius: 50,
                }}
                to={`/edit/${state._id}`}
                state={{ ...state }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </Link>
              <div
                onClick={() => deletePost(state._id)}
                className='edit-btn'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  backgroundColor: "tomato",
                  color: "white",
                  padding: 5,
                  borderRadius: 50,
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>

      <div className='image'>
        <img
          src={`http://localhost:3000/${state.coverImage}`}
          alt='alternate image'
        />
      </div>
      <div
        style={{ marginTop: 7 }}
        dangerouslySetInnerHTML={{ __html: state.post }}
      />
    </div>
  );
};

export default PostDetails;
