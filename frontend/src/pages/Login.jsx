import LoginForm from "../components/LoginForm"

function Login() {
    return <LoginForm route="/api/token/" method="login" />
}

export default Login