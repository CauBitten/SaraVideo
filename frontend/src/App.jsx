import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateRepo from "./pages/CreateRepo"
import Home from "./pages/Home"
import RepoDetail from "./pages/RepoDetail"
import Upload from "./pages/Upload"
import EditRepo from "./pages/EditRepo"
import UserEdit from "./pages/UserEdit"
import Video from "./pages/Video"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/criar-repo" element={<CreateRepo />} />
        <Route path="/repositorios/:id" element={<RepoDetail />} />
        <Route path="/repositorios/:id/upload" element={<Upload />} />
        <Route path="/repositorios/:id/edit" element={<EditRepo />} />
        <Route path="/videos/:id" element={<Video />} />
        <Route path="/editar-usuario" element={<UserEdit />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App