import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import "../styles/Repositorio.css";

function Repositorio() {
    const { id } = useParams();
    const [repositorio, setRepositorio] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchRepositorio();
        fetchVideos();
    }, [id]);

    if (loading) return <p>Carregando...</p>;

    if (!repositorio) return <p>Repositório não encontrado.</p>;

    return (
        <div className="repositorio-container">
            <h1>Detalhes do Repositório - {repositorio.nome}</h1>
            <p>Descrição: {repositorio.descricao}</p>
            <p>Criado em: {new Date(repositorio.criado_em).toLocaleDateString()}</p>

            {/* Botão para redirecionar ao upload de vídeo */}
            <Link to={`/repositorios/${id}/upload`}>
                <button>Upload Video</button>
            </Link>

            <div className="videos-list">
                {videos.map(video => (
                    <Link key={video.id} to={`/videos/${video.id}`} className="video-item">
                        {video.thumbnail && (
                            <img src={video.thumbnail} alt={`${video.titulo} thumbnail`} className="video-thumbnail"/>
                        )}
                        <h2>{video.titulo}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Repositorio;
