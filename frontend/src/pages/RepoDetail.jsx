import { useEffect, useState } from "react";
import Repositorio from "../components/Repositorio";
import api from "../api";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/RepoDetail.css"; // Adicionando o CSS correspondente

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
      console.log(repositorio);
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
      <NavBar />
      <div className="repo-detail-container">
        <Repositorio />
        <Link to={`/repositorios/${id}/edit`} className="edit-button">
          Editar Repositório
        </Link>
      </div>
    </div>
  );
}

export default RepoDetail;
