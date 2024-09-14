import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NotFound from "./components/not_found/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateRepo from "./components/create_repo/CreateRepo";
import Repository from "./components/repository/Repository";
import RepoDetail from "./components/repo_detail/RepoDetail";
import Upload from "./components/upload/Upload";
import EditRepo from "./components/edit_repository/EditRepo";
import UserEdit from "./components/edit_user/UserEdit";
import Video from "./components/video/Video";
import Overview from "./components/overview/Overview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/criar-repo" element={<CreateRepo />} />
        <Route path="/repositorios/:id" element={<RepoDetail />} />
        <Route path="/repositorios/:id/upload" element={<Upload />} />
        <Route path="/repositorios/:id/edit" element={<EditRepo />} />
        <Route path="/videos/:id" element={<Video />} />
        <Route path="/editar-usuario" element={<UserEdit />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
