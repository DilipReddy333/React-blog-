import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import AuthProvider from "./context/AuthProvider";
import CreatePost from "./components/CreatePost";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PostDetails from "./components/PostDetails";
import EditPage from "./components/EditPage";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              user?.user?.username ? <HomePage /> : <Navigate to='/login' />
            }
          />
          <Route
            path='/login'
            element={user?.user?.username ? <Navigate to='/' /> : <Login />}
          />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostDetails />} />
          <Route path='/edit/:id' element={<EditPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
