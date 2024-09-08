import { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "../../styles/UserEdit.css";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

function UserEditForm() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/api/profile/");
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
      await api.put("/api/profile/", values);
      navigate("/");
    } catch (error) {
      alert("Failed to update user profile. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="user-edit-form-container">
      <Title level={1} className="user-edit-form-title">
        Edit Profile <UserOutlined />
      </Title>
      <Form
        form={form}
        name="editUser"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <div className="form-user-info">
          <Form.Item
            label={<span className="custom-label">Your Photo</span>}
            className="user-edit-form-item"
            name="photo"
          >
            <div id="form-image">
              <div
                id="repository-image-caixa"
                className="file-upload-box"
                onClick={() => document.getElementById("file-input").click()}
              >
                <span className="plus-sign">{fileName ? fileName : "+"}</span>
              </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </div>
          </Form.Item>

          <div className="form-direita">
            <Form.Item
              label={<span className="custom-label">Full name</span>}
              className="user-edit-form-item"
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input placeholder="Your full name" className="user-edit-input" />
            </Form.Item>

            <Form.Item
              label={<span className="custom-label">Username</span>}
              className="user-edit-form-item"
              name="username"
              rules={[{ required: true, message: "Username is required!" }]}
            >
              <Input
                placeholder="Your username"
                className="user-edit-input"
                disabled
              />
            </Form.Item>
          </div>
        </div>

        <div id="form-credentials">
          <Form.Item
            label={<span className="custom-label">E-mail</span>}
            className="user-edit-form-item"
            name="email"
            rules={[{ required: true, message: "Please input your e-mail!" }]}
          >
            <Input
              placeholder="Your e-mail"
              className="user-edit-input user-edit-credentials"
            />
          </Form.Item>

          <Form.Item
            label={<span className="custom-label">Password</span>}
            className="user-edit-form-item"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Your password"
              className="user-edit-input user-edit-credentials"
            />
          </Form.Item>
        </div>

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
