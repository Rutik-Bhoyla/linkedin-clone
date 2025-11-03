import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import PostCard from "./components/PostCard";


const App = () => {
  
  return (
      <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
      </Routes>
  )
}

export default App