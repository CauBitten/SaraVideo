import React, { useEffect, useState } from "react";
import Repositorio from "../components/Repositorio";
import DeleteRepositoryButton from "../components/DeleteRepoButton";
import api from "../api";
import { useParams, Link } from "react-router-dom";

function RepoDetail() {
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
                setRepositorio(null);
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
            <Repositorio />
            <Link to={`/repositorios/${id}/edit`}>
                <button>Editar Repositório</button>
            </Link>
        </div>
    );
}

export default RepoDetail;
