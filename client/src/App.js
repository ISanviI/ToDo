import './index.css';
import NavBar from "./components/NavBar.js"
import Tasks from "./components/Tasks.js"
import Register from "./components/Register.js"
import Login from "./components/Login.js"
import Profile from "./components/Profile.js"
import Create from "./components/Create.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <h1>Welcome to To-Do Website</h1>
        <Routes>
          <Route path="/" element={<Tasks/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create-task" element={<Create/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
