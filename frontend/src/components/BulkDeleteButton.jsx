// BulkDeleteButton.js
import React from "react";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import api from "../api";

const { confirm } = Modal;

function BulkDeleteButton({ selectedVideos, onDeleteSuccess, repositoryId }) {

    const showDeleteConfirm = () => {
        confirm({
            title: 'Tem certeza que deseja excluir os vídeos selecionados?',
            icon: <ExclamationCircleOutlined />,
            content: 'Essa ação não pode ser desfeita.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                handleBulkDelete();
            },
            onCancel() {
                // Nada a fazer
            },
        });
    };

    const handleBulkDelete = async () => {
        try {
            // Supondo que a API suporte exclusão em massa
            await api.post(`/api/videos/bulk-delete/`, { ids: selectedVideos });
            alert('Vídeos excluídos com sucesso!');
            onDeleteSuccess();
        } catch (error) {
            alert('Falha ao excluir vídeos.');
            console.error('Erro na exclusão em massa:', error);
        }
    };

    return (
        <Button
            type="danger"
            onClick={showDeleteConfirm}
            disabled={selectedVideos.length === 0}
            className={`bulk-delete-btn ${selectedVideos.length > 0 ? 'active' : ''}`}
        >
            Excluir Vídeos
        </Button>
    );
}

export default BulkDeleteButton;
