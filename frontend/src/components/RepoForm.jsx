/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

function RepoForm({ route }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { nome, descricao });
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Criar Repositório</h1>
      <input
        className="form-input"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do repositório"
      />
      <input
        className="form-input"
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição do repositório"
      />
      <button className="form-button" type="submit">
        Criarr
      </button>
    </form>
  );
}

export default RepoForm;
