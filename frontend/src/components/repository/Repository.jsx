import UserRepos from "./UserRepos";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import SearchBar from "./SearchBox";
import "../../styles/Repository.css";

function Repository() {
  const navigate = useNavigate();

  const handleCreateRepoClick = () => {
    navigate("/criar-repo");
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="home">
        <div className="SearchAndCreate">
          <SearchBar />

          <button onClick={handleCreateRepoClick} className="createRepoButton">
            Criar Repositório
          </button>
        </div>

        <UserRepos />
      </div>
    </div>
  );
}

export default Repository;
