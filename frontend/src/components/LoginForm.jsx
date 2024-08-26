import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const res = await api.post("/api/token/", {
        username: values.username,
        password: values.password,
      });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="titulo-form">Sign In</h1>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        className="login-form"
      >
        <label className="label">EMAIL OR USERNAME</label>
        <Form.Item
          className="form-input"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Your email or username" className="input-form" />
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
              Sign In
            </Button>
          </Form.Item>

          <a className="link" href="/register">
            Don’t have an account? Click<br></br>
            here to sign up.
          </a>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
