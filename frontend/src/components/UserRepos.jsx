/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function UserRepos() {
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepositorios = async () => {
            try {
                const response = await api.get("/api/repositorios-list/");
                setRepositorios(response.data);
            } catch (err) {
                setError("Erro ao carregar repositórios");
            } finally {
                setLoading(false);
            }
        };

        fetchRepositorios();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Meus Repositórios</h1>
            <ul>
                {repositorios.map((repo) => (
                    <li key={repo.id}>
                        <Link to={`/repositorios/${repo.id}`}>
                            {repo.nome}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserRepos;
