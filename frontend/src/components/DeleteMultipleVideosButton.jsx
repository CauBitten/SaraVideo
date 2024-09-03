import React from "react";
import { Button, Modal } from "antd";
import api from "../api";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function DeleteMultipleVideosButton({ selectedVideos, onSuccess }) {
    const handleBulkDelete = async () => {
        try {
            // Faz a requisição DELETE com os IDs dos vídeos selecionados
            await api.delete(``, {
                data: { ids: selectedVideos } // Correspondência com o campo 'ids' na view do Django
            });
            alert('Vídeos excluídos com sucesso!');
            onSuccess(); // Chama a função de sucesso passada como prop para atualizar a lista de vídeos
        } catch (error) {
            alert('Falha ao excluir vídeos. Por favor, tente novamente mais tarde.');
            console.error('Erro na exclusão em massa:', error);
        }
    };

    const showDeleteConfirm = () => {
        confirm({
            title: 'Tem certeza que deseja excluir os vídeos selecionados?',
            icon: <ExclamationCircleOutlined />,
            content: 'Essa ação não pode ser desfeita.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk: handleBulkDelete,
            onCancel() {
                // Nada a fazer
            },
        });
    };

    return (
        <Button
            type="danger"
            onClick={showDeleteConfirm}
            disabled={selectedVideos.length === 0}
        >
            Excluir Vídeos Selecionados
        </Button>
    );
}

export default DeleteMultipleVideosButton;
