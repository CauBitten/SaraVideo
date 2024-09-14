import RegisterForm from "./RegisterForm";
import HomeImage from "/static/home.jpeg";
import { useNavigate } from "react-router-dom"; // Importa useLocation

function Register() {
  const navigate = useNavigate(); // Hook para navegação

  const handleMenuClick = () => {
    navigate("/"); // Redireciona para o caminho fornecido
  };

  return (
    <div>
      <a className="title" onClick={() => handleMenuClick()}>
        SaraVideo Manager
      </a>

      <div className="row">
        <div className="col container-form">
          <RegisterForm route="/api/user/register/" />
        </div>
        <div className="col">
          <img
            src={HomeImage}
            alt="Example"
            className="image"
            style={{ height: "120%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
