import RegisterForm from "./RegisterForm";
import HomeImage from "../../static/home.jpeg";

function Register() {
  return (
    <div>
      <h1 className="title">SaraVideo Manager</h1>
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
