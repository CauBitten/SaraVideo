import React from "react";
import UserEditForm from "../components/UserEditForm";
import { useNavigate } from "react-router-dom";

function UserEdit() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Editar Perfil</h1>
            <UserEditForm />
            <button onClick={() => navigate(-1)}>Voltar</button>
        </div>
    );
}

export default UserEdit;
