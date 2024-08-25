import LoginForm from "../components/LoginForm";
import HomeImage from "../static/home.jpeg";

function Login() {
  return (
    <div className="container">
      <h1 className="titulo-login">SaraVideo Manager</h1>
      <div className="row">
        <div className="col container-login">
          <LoginForm />
        </div>
        <div className="col">
          <img src={HomeImage} alt="Example" className="image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
