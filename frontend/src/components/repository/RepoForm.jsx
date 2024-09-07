/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "../../styles/Form.css";
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
          <label>Repository name</label>
          <input
            className="form-input repo-form-input"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: "420px" }}
          />
        </div>
        <div id="form-description" className="form-box">
          <label>Description</label>
          <input
            className="form-input repo-form-input"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ width: "420px" }}
          />
        </div>

        <div className="form-dropdown">
          <label>Collaborators</label>
          <select id="options" name="options">
            <option value="option1">Collaborator 1</option>
            <option value="option2">Collaborator 2</option>
            <option value="option3">Collaborator 3</option>
          </select>
        </div>

        <div id="personal-alert">
          <span id="alert-i">i</span>
          You are creating a repository in your personal account.
        </div>

        <button className="form-button" type="submit">
          Create Repository
        </button>
      </div>
      <div id="repository-image">
        <label>Repository Image</label>
        <div
          id="repository-image-caixa"
          className="file-upload-box"
          onClick={() => document.getElementById("file-input").click()}
        >
          +
        </div>

        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          /* onChange={(e) => handleFileUpload(e)} */
        />
      </div>
    </form>
  );
}

export default RepoForm;
