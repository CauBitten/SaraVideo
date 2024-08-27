import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Form.css";

const { Title } = Typography;

function UserEditForm() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/api/profile/');
                form.setFieldsValue(response.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [form]);

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            await api.put('/api/profile/', values);
            navigate("/");
        } catch (error) {
            alert("Failed to update user profile. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Title level={1} className="titulo-form">Edit User</Title>
            <Form
                form={form}
                name="editUser"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                className="login-form"
            >
                <label className="label">USERNAME</label>
                <Form.Item
                    className="form-input"
                    name="username"
                    rules={[{ required: true, message: "Username is required!" }]}
                >
                    <Input placeholder="Your username" className="input-form" disabled />
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
                            Save Changes
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}

export default UserEditForm;
