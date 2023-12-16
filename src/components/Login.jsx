import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Spinner from "./Spinner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        "https://react-blog-backend-pshn.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      // console.log(response);
      const data = await response.json();
      if (data.error) {
        setMessage(data.error);
        setLoading(false);
        return;
      }
      localStorage.setItem("user", JSON.stringify(data));
      setUser({ ...data });
      setUsername("");
      setPassword("");
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };
  return (
    <div className='container'>
      {message && <div className='error'>{message}</div>}
      {loading && <Spinner message='Logging in...' />}
      <form className='register' onSubmit={formSubmitHandler}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          required
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='password'
          required
          placeholder='password'
        />
        <button type='submit'>Login</button>
      </form>
      <div>
        Don't have an account? <Link to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default Login;
