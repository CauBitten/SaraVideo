import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import "../styles/Repositorio.css";
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import VideoUploadForm from '../components/VideoUploadForm';

const { confirm } = Modal;

function Repositorio() {
    const { id } = useParams();
    const [repositorio, setRepositorio] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState([]);
    
    // Estado para o pop-up de upload de vídeo
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchRepositorio();
        fetchVideos();
    }, [id]);

    const fetchRepositorio = async () => {
        try {
            const response = await api.get(`/api/repositorios/${id}/`);
            setRepositorio(response.data);
        } catch (error) {
            console.error("Erro ao buscar repositório:", error);
        }
    };

    const fetchVideos = async () => {
        try {
            const response = await api.get(`/api/repositorios/${id}/videos/`);
            setVideos(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar vídeos:", error);
        }
    };

    const toggleSelectionMode = () => {
        if (isSelectionMode) {
            setSelectedVideos([]);
        }
        setIsSelectionMode(!isSelectionMode);
    };

    const toggleVideoSelection = (videoId) => {
        if (selectedVideos.includes(videoId)) {
            setSelectedVideos(selectedVideos.filter(id => id !== videoId));
        } else {
            setSelectedVideos([...selectedVideos, videoId]);
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
            onOk() {
                handleBulkDelete();
            },
        });
    };

    const handleBulkDelete = async () => {
        try {
            await api.delete(`/api/videos/delete-multiple/`, {
                data: { ids: selectedVideos }
            });
            alert('Vídeos excluídos com sucesso!');
            setSelectedVideos([]);
            fetchVideos();
            setIsSelectionMode(!isSelectionMode);
        } catch (error) {
            alert('Falha ao excluir vídeos. Por favor, tente novamente mais tarde.');
            console.error('Erro na exclusão em massa:', error);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAfterClose = () => {
        setSelectedVideos([]);
    };

    const handleUploadSuccess = () => {
        setIsModalVisible(false);
        fetchVideos();
    };

    if (loading) return <p>Carregando...</p>;

    if (!repositorio) return <p>Repositório não encontrado.</p>;

    return (
        <div className="repositorio-container">
            <h1>Detalhes do Repositório - {repositorio.nome}</h1>
            <p>Descrição: {repositorio.descricao}</p>
            <p>Criado em: {new Date(repositorio.criado_em).toLocaleDateString()}</p>
            <p>Criador: {repositorio.criador.username}</p>

            <div className="repositorio-actions">
                <Button className="upload-video-btn" type="primary" onClick={showModal}>
                    Upload Vídeo
                </Button>

                <button className="selection-mode-btn" onClick={toggleSelectionMode}>
                    {isSelectionMode ? '✖' : '✔'}
                </button>

                {isSelectionMode && (
                    <button
                        className={`bulk-delete-btn ${selectedVideos.length > 0 ? 'active' : ''}`}
                        onClick={showDeleteConfirm}
                        disabled={selectedVideos.length === 0}
                    >
                        Excluir Vídeos
                    </button>
                )}
            </div>

            <div className="videos-list">
                {videos.map(video => (
                    <div
                        key={video.id}
                        className={`video-item ${isSelectionMode && selectedVideos.includes(video.id) ? 'selected' : ''}`}
                        onClick={() => {
                            if (isSelectionMode) {
                                toggleVideoSelection(video.id);
                            }
                        }}
                    >
                        {isSelectionMode && (
                            <input
                                type="checkbox"
                                className="video-checkbox"
                                checked={selectedVideos.includes(video.id)}
                                onChange={() => toggleVideoSelection(video.id)}
                                onClick={(e) => e.stopPropagation()} 
                            />
                        )}
                        <Link to={`/videos/${video.id}`} className="video-link">
                            {video.thumbnail && (
                                <img src={video.thumbnail} alt={`${video.titulo} thumbnail`} className="video-thumbnail" />
                            )}
                            <h2>{video.titulo}</h2>
                        </Link>
                    </div>
                ))}
            </div>

            <Modal
                title="Upload Vídeo"
                visible={isModalVisible}
                onCancel={handleCancel}
                afterClose={handleAfterClose}
                footer={null}
                centered
            >
                <VideoUploadForm 
                    route={`/api/repositorios/${id}/upload/`} 
                    onUploadSuccess={handleUploadSuccess} 
                />
            </Modal>
        </div>
    );
}

export default Repositorio;