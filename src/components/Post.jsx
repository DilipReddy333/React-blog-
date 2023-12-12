import { Link } from "react-router-dom";

const Post = ({
  _id,
  title,
  summary,
  post,
  coverImage,
  createdAt,
  authorName,
  authorId,
}) => {
  return (
    <div className='post'>
      <div className='image'>
        <Link
          to={`/post/${_id}`}
          state={{
            _id,
            title,
            summary,
            post,
            coverImage,
            authorName,
            createdAt,
            authorId,
          }}
        >
          <img
            src={`http://localhost:3000/${coverImage}`}
            alt='alternate image'
          />
        </Link>
      </div>
      <div className='texts'>
        <Link
          to={`/post/${_id}`}
          state={{
            _id,
            title,
            summary,
            post,
            coverImage,
            authorName,
            createdAt,
            authorId,
          }}
        >
          <h2>{title}</h2>
        </Link>
        <p className='info'>
          <a href='#' className='author'>
            {authorName}
          </a>
          <time>{new Date(createdAt).toDateString("en-GB")}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
