/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Form.css";

const { Title, Link } = Typography;

function RegisterForm({ route }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            await api.post(route, { username: values.username, password: values.password, email: values.email });
            navigate("/login");
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
      <h1 className="titulo-form">Register</h1>
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        className="login-form"
      >
        <label className="label">USERNAME</label>
        <Form.Item
          className="form-input"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Your username" className="input-form" />
        </Form.Item>

        <label className="label">E-MAIL</label>
        <Form.Item
          className="form-input"
          name="email"
          rules={[{ required: true, message: "Please input your e-mail!" }]}
        >
          <Input placeholder="Your e-mail" className="input-form" />
        </Form.Item>

        <label className="label">PASSWORD</label>
        <Form.Item
          className="form-input"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Your password" className="input-form" />
        </Form.Item>

        <div className="buttons">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="button"
            >
              Register
            </Button>
          </Form.Item>
          <a className="link" href="/login">
            Already have an account?<br></br>
            Click here to login.
          </a>
        </div>
      </Form>
    </div>
    );
}

export default RegisterForm;
