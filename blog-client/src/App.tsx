import { BrowserRouter, Routes, Route } from "react-router-dom"
import Upload from "./pages/Upload"
import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/createpost" element={<Upload />} />
          {/* <Route element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route path="/group/join/:inviteCode" element={<Join />} />
            <Route path="/group/:groupId" element={<Group />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App