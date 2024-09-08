/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "../../styles/EditRepoForm.css";

function DeleteRepositoryButton({ repositoryId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    Modal.confirm({
      title: "Are you sure you want to delete this repository?",
      content: "This action cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await api.delete(`/api/repositorios/${repositoryId}/delete/`);
          alert("Repository deleted successfully!");
          navigate("/");
        } catch (error) {
          alert("Failed to delete repository.");
          console.error("Delete error:", error);
        }
      },
    });
  };

  return (
    <Button type="danger" onClick={handleDelete} className="delete-repo-button">
      Delete Repository
    </Button>
  );
}

export default DeleteRepositoryButton;
