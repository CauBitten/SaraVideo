import React, { useState } from "react";
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
        <div className="container">
            <div>
                <Title level={2}>Register</Title>
                <Form
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input placeholder="Username" className="ant-input" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input type="email" placeholder="E-mail" className="ant-input" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password placeholder="Password" className="ant-input-password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="ant-btn-primary">
                            Register
                        </Button>
                    </Form.Item>
                    <p>
                        <Link href="/login" className="form-link">Already have an account? Click here to login.</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default RegisterForm;
