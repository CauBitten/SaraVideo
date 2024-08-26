import RegisterForm from "../components/RegisterForm"
import HomeImage from "../static/home.jpeg";

function Register() {
    return <div className="container">
        <h1 className="title">SaraVideo Manager</h1>
        <div className="row">
            <div className="col container-form">
                <RegisterForm route="/api/user/register/" />
            </div>
            <div className="col">
                <img src={HomeImage} alt="Example" className="image" />
            </div>
        </div>
    </div>
}

export default Register