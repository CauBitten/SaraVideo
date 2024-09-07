import LoginForm from "./LoginForm";
import HomeImage from "../../static/home.jpeg";

function Login() {
  return (
    <div className="container">
      <h1 className="title">SaraVideo Manager</h1>
      <div className="row">
        <div className="col container-form">
          <LoginForm />
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

export default Login;
