/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "../../styles/UserRepos.css";

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
        
            <ul className="listRepos">

                {repositorios.map((repo) => (
                    
                    <li key={repo.id} className="repositoryBox">

                        <Link to={`/repositorios/${repo.id}`} className="repository"> 
                            <h2 className="titleRepo"> {repo.nome} </h2>
                            <span/>
                            <h5 className="description"> {repo.descricao} </h5>
                        </Link>

                    </li>

                ))}

            </ul>

    );
}

export default UserRepos;
