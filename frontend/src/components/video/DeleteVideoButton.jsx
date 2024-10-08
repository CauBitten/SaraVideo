/* eslint-disable react/prop-types */
// Componente DeleteVideoButton.js
import { Modal } from "antd";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "../../styles/Video.css";
import { DeleteOutlined } from "@ant-design/icons"

function DeleteVideoButton({ videoId, repositoryId }) {  // Recebe o repositoryId como prop
    const navigate = useNavigate();

    const handleDelete = async () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this video?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await api.delete(`/api/videos/${videoId}/delete/`);
                    alert('Video deleted successfully!');
                    navigate(`/repositorios/${repositoryId}/`); // Navega para a página correta do repositório
                } catch (error) {
                    alert('Failed to delete video.');
                    console.error('Delete error:', error);
                }
            }
        });
    };

    return (
        <DeleteOutlined className="delete-button" type="danger" onClick={handleDelete} />
    );
}

export default DeleteVideoButton;