import UserEditForm from "./UserEditForm";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import "../../styles/NavBar.css";
import "../../styles/UserEdit.css"; // Importe o novo CSS

function UserEdit() {
    const navigate = useNavigate();

    return (
        <div>
            <NavBar />
            <div className="user-edit-container">
                <UserEditForm />
                <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
            </div>
        </div>
    );
}

export default UserEdit;
