import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import AuthRedirect from "./utils/AuthRedirect";
import MyPosts from "./pages/MyPosts";


const App = () => {
  
  return (
      <Routes>
          <Route path="/" element={<AuthRedirect> <Register/> </AuthRedirect>} />
          <Route path="/login" element={<AuthRedirect> <Login /> </AuthRedirect>} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/myposts" element={<MyPosts />}/>
      </Routes>
  )
}

export default App