import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import "../styles/Repositorio.css";
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function Repositorio() {
    const { id } = useParams();
    const [repositorio, setRepositorio] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados para seleção de vídeos
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState([]);

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

    if (loading) return <p>Carregando...</p>;

    if (!repositorio) return <p>Repositório não encontrado.</p>;

    // Função para alternar o modo de seleção
    const toggleSelectionMode = () => {
        if (isSelectionMode) {
            // Ao sair do modo de seleção, limpar seleções
            setSelectedVideos([]);
        }
        setIsSelectionMode(!isSelectionMode);
    };

    // Função para selecionar/deselecionar um vídeo
    const toggleVideoSelection = (videoId) => {
        if (selectedVideos.includes(videoId)) {
            setSelectedVideos(selectedVideos.filter(id => id !== videoId));
        } else {
            setSelectedVideos([...selectedVideos, videoId]);
        }
    };

    // Função para exibir confirmação de exclusão
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

    // Função para excluir os vídeos selecionados
    const handleBulkDelete = async () => {
        try {
            // Faz a requisição DELETE com os IDs dos vídeos selecionados
            await api.delete(`/api/videos/delete-multiple/`, {
                data: { ids: selectedVideos }
            });
            alert('Vídeos excluídos com sucesso!');
            setSelectedVideos([]); // Limpa a seleção
            fetchVideos(); // Atualiza a lista de vídeos após a exclusão
            setIsSelectionMode(!isSelectionMode);
        } catch (error) {
            alert('Falha ao excluir vídeos. Por favor, tente novamente mais tarde.');
            console.error('Erro na exclusão em massa:', error);
        }
    };

    return (
        <div className="repositorio-container">
            <h1>Detalhes do Repositório - {repositorio.nome}</h1>
            <p>Descrição: {repositorio.descricao}</p>
            <p>Criado em: {new Date(repositorio.criado_em).toLocaleDateString()}</p>

            <div className="repositorio-actions">
                {/* Botão para redirecionar ao upload de vídeo */}
                <Link to={`/repositorios/${id}/upload`}>
                    <button className="upload-video-btn">Upload Vídeo</button>
                </Link>

                {/* Botão redondo para ativar/desativar o modo de seleção */}
                <button className="selection-mode-btn" onClick={toggleSelectionMode}>
                    {isSelectionMode ? '✖' : '✔'}
                </button>

                {/* Botão de excluir vídeos selecionados */}
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
                                onClick={(e) => e.stopPropagation()} // Evita que o clique no checkbox dispare o clique no container
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
        </div>
    );
}

export default Repositorio;
