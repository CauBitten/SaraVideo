/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Form.css";

function VideoUploadForm({ route, onUploadSuccess }) {
  const { id: repositoryId } = useParams();
  const [title, setTitle] = useState(""); // Estado inicial do título
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para gerar o título baseado na data e hora atuais
  const generateTitle = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' '); // Formata como "YYYY-MM-DD HH:MM:SS"
    return `Video ${formattedDate}`;
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!videoFile) {
      alert("Please select a video file");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("titulo", title || generateTitle()); // Usa o título gerado se o estado estiver vazio
    formData.append("arquivo", videoFile);

    try {
      await api.post(route, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Video uploaded successfully!");
      if (onUploadSuccess) onUploadSuccess();
      navigate(`/repositorios/${repositoryId}/`); // Navega de volta à página principal do repositório
    } catch (error) {
      alert("Failed to upload video.");
      console.error("There was an error uploading the video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="form-page">
      <form onSubmit={handleSubmit} className="form-container-u">
        <h1>Upload Video</h1>
        <h4>Fill in the fields below with information about the video</h4>
        <label>Video Title</label>
        <input
          className="form-input-u"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Leave blank to use default title"
        />
        <input
          className="form-input-u-video"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
        <button
          className="form-button-u especial"
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUploadForm;
