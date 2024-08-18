import RegisterForm from "../components/RegisterForm"

function Register() {
    return <RegisterForm route="/api/user/register/" method="register" />
}

export default Register