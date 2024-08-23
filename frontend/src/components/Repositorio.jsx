import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
            <h1>{repositorio.nome}</h1>
            <p>{repositorio.descricao}</p>
        </div>
    );
}

export default Repositorio;