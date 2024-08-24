import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateRepo from "./pages/CreateRepo"
import Home from "./pages/Home"
import RepoDetail from "./pages/RepoDetail"
import Upload from "./pages/Upload"
import EditRepo from "./pages/EditRepo"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

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
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/criar-repo" element={<CreateRepo />} />
        <Route path="/repositorios/:id" element={<RepoDetail />} />
        <Route path="/repositorios/:id/upload" element={<Upload />} />
        <Route path="/repositorios/:id/edit" element={<EditRepo />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App