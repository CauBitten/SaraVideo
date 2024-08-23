import LoginForm from "../components/LoginForm";
import HomeImage from "../static/home.jpeg";

function Login() {
    return <div className="container">
        <div className="row">
            <div className="col">
                <LoginForm route="/api/token/" />
            </div>
            <div className="col">
                <img src={HomeImage} alt="Example" className="image" />
            </div>
        </div>
    </div>
}

export default Login