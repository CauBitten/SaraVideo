import LoginForm from "../components/LoginForm";
import HomeImage from "../static/home.jpeg";

function Login() {
  return (
    <div className="container">
      <h1 className="title">SaraVideo Manager</h1>
      <div className="row">
        <div className="col container-form">
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
