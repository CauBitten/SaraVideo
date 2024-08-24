import React, { useEffect, useState } from "react";
import Repositorio from "../components/Repositorio";
import DeleteRepositoryButton from "../components/DeleteRepoButton";
import api from "../api";
import { useParams } from "react-router-dom";

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
                setRepositorio(null); // Define como null se houver erro
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
            {repositorio && (
                <DeleteRepositoryButton repositoryId={id} />
            )}
        </div>
    );
}

export default RepoDetail;
