import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

function Repositorio() {
    const { id } = useParams();
    const [repositorio, setRepositorio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepositorio = async () => {
            try {
                const response = await api.get(`/api/repositorios/${id}/`);
                setRepositorio(response.data);
            } catch (error) {
                console.error("Erro ao buscar repositório:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepositorio();
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!repositorio) {
        return <p>Repositório não encontrado.</p>;
    }

    return (
        <div>
            <h1>Detalhes do Repositório - {repositorio.nome}</h1>
            <p>Descrição: {repositorio.descricao}</p>
            <p>Criado em: {new Date(repositorio.criado_em).toLocaleDateString()}</p>

            {/* Botão para redirecionar ao upload de vídeo */}
            <Link to={`/repositorios/${id}/upload`}>
                <button>Upload Video</button>
            </Link>
        </div>
    );
}

export default Repositorio;
