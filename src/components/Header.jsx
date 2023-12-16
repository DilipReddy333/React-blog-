import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
      if (user) {
        setUser(user);
      }
    };
    getUser();
    // console.log(user);
  }, []);
  const logout = () => {
    localStorage.removeItem("user");
    setUser({});
    alert("Logout successful");
    navigate("/login");
  };
  return (
    <header>
      <Link to='/' className='logo'>
        MyNotes
      </Link>
      {!user?.user?.username ? (
        <nav>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </nav>
      ) : (
        <nav>
          <Link style={{ color: "#3081D0", fontWeight: "bold" }}>
            {user?.user?.username}
          </Link>
          <Link to='/create'>Create note</Link>
          <Link onClick={logout} style={{ color: "tomato", fontWeight: 500 }}>
            Logout
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
