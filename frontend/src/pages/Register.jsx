import RegisterForm from "../components/RegisterForm"
import HomeImage from "../static/home.jpeg";

function Register() {
    return <div className="container">
        <div className="row">
            <div className="col">
                <RegisterForm route="/api/user/register/" />
            </div>
            <div className="col">
                <img src={HomeImage} alt="Example" className="image" />
            </div>
        </div>
    </div>
}

export default Register