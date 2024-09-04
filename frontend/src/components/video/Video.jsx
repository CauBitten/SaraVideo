// Componente Video.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import "../../styles/Video.css";
import DeleteVideoButton from './DeleteVideoButton';
import NavBar from "../NavBar";

function Video() {
    const { id: videoId } = useParams(); // Renomeado para videoId para evitar confusão
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await api.get(`/api/videos/${videoId}/`);
                setVideo(response.data);
            } catch (error) {
                console.error("Erro ao buscar vídeo:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [videoId]);

    if (loading) return <p>Carregando...</p>;
    if (!video) return <p>Vídeo não encontrado.</p>;

    return (
        <div>
            <NavBar />
            <div className="video-container">
                <h1>{video.titulo}</h1>
                <video controls>
                    <source src={video.arquivo} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                </video>
                <p>{video.descricao}</p>
                {/* Alterado para usar o campo correto de repositoryId */}
                <DeleteVideoButton videoId={videoId} repositoryId={video.repositorio} /> 
            </div>
        </div>    
    );
}

export default Video;