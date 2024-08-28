import React from "react";
import UserRepos from "../components/UserRepos";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

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
            <div>
                <UserRepos />
                <button onClick={handleCreateRepoClick}>
                    Criar Novo Repositório
                </button>
                <button onClick={handleEditUserClick}>
                    Editar Perfil
                </button>
            </div>
        </div>
    );
}

export default Home;
