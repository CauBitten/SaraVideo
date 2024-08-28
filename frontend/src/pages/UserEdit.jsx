import React from "react";
import UserEditForm from "../components/UserEditForm";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/NavBar.css"

function UserEdit() {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <h1>Editar Perfil</h1>
                <UserEditForm />
                <button onClick={() => navigate(-1)}>Voltar</button>
            </div>
        </div>
    );
}

export default UserEdit;
