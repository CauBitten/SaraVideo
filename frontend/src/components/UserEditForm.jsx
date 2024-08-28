import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/UserEdit.css"; // Importe o novo CSS

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
        <div className="user-edit-form-container">
            <Title level={1} className="user-edit-form-title">Edit User</Title>
            <Form
                form={form}
                name="editUser"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Username"
                    className="user-edit-form-item"
                    name="username"
                    rules={[{ required: true, message: "Username is required!" }]}
                >
                    <Input placeholder="Your username" className="user-edit-input" disabled />
                </Form.Item>

                <Form.Item
                    label="E-mail"
                    className="user-edit-form-item"
                    name="email"
                    rules={[{ required: true, message: "Please input your e-mail!" }]}
                >
                    <Input placeholder="Your e-mail" className="user-edit-input" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    className="user-edit-form-item"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password placeholder="Your password" className="user-edit-input" />
                </Form.Item>

                <div className="user-edit-button-container">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="user-edit-save-button"
                    >
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default UserEditForm;
