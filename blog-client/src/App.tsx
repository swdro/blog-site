import { BrowserRouter, Routes, Route } from "react-router-dom"
import Upload from "./pages/Upload"
import { Header } from "./components/Header"
import { Home } from "./pages/Home"
import { Error404 } from "./pages/Error404"
import './App.css'
import { Post } from "./pages/Post"
import Login from "./pages/Login"

function App() {
  return (
    <div className="bg-background">
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<Upload />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App