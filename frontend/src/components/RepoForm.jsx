/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import { Checkbox } from "antd";

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
      <div id="repository-form">
        <h1>Create a new repository</h1>
        <h4>A repository contains all videos, including the analytics.</h4>
        <div className="form-box">
          <label>Owner</label>
          <input
            className="form-input repo-form-input"
            type="text"
            /* value={usuario} readOnly  favor editar*/
            style={{ width: "130px" }}
          />
        </div>
        <div className="form-box">
          <label>Repository name</label>
          <input
            className="form-input repo-form-input"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: "246px" }}
          />
        </div>
        <div className="form-box">
          <label>Description</label>
          <input
            className="form-input repo-form-input"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ width: "420px" }}
          />
          <div className="form-checkbox">
            <input type="checkbox" />
            <label>Private Repository?</label>
          </div>
        </div>
        <button className="form-button" type="submit">
          Create Repository
        </button>
      </div>
      <div id="repository-image">htrhtrhb</div>
    </form>
  );
}

export default RepoForm;
