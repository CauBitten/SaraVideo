import UserRepos from "./UserRepos";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import SearchBar from "./SearchBox";
import "../../styles/Home.css";

function Home() {
    
    const navigate = useNavigate();

    const handleCreateRepoClick = () => {
        navigate("/criar-repo");
    };

    const handleEditUserClick = () => {
        navigate("/editar-usuario");
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
                
                <button onClick={handleEditUserClick}>
                    Editar Perfil
                </button>

            </div>

        </div>
    );
}

export default Home;
