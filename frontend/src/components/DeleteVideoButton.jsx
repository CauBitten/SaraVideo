/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Video.css";

function DeleteVideoButton({ videoId }) {
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
                    navigate("/");
                } catch (error) {
                    alert('Failed to delete video.');
                    console.error('Delete error:', error);
                }
            }
        });
    };

    return (
        <Button className="delete-button" type="danger" onClick={handleDelete}>
            Delete Video
        </Button>
    );
}

export default DeleteVideoButton;
