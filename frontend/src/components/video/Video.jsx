import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import "../../styles/Video.css";
import DeleteVideoButton from './DeleteVideoButton';
import NavBar from "../NavBar";
import AnaliseVideo from '../analise/AnaliseVideo'; // Importa o componente de análise

function Video() {
    const { id: videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [analise, setAnalise] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideoAndAnalysis = async () => {
            try {
                // Busca os dados do vídeo
                const response = await api.get(`/api/videos/${videoId}/`);
                setVideo(response.data);

                // Busca a análise associada ao vídeo
                const analiseResponse = await api.get(`/api/videos/${videoId}/analise/`);
                setAnalise(analiseResponse.data);
            } catch (error) {
                console.error("Erro ao buscar vídeo ou análise:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideoAndAnalysis();
    }, [videoId]);

    if (loading) return <p>Carregando...</p>;
    if (!video) return <p>Vídeo não encontrado.</p>;

    return (
        <div>
            <NavBar />
            <div className="video-page-container">
                <div className="video-container">
                    <h1>{video.titulo}</h1>
                    <video controls>
                        <source src={video.arquivo} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                    </video>
                    <p>{video.descricao}</p>
                    <DeleteVideoButton videoId={videoId} repositoryId={video.repositorio} /> 
                </div>
                <AnaliseVideo analise={analise} /> {/* Renderiza o componente de análise */}
            </div>
        </div>
    );
}

export default Video;
