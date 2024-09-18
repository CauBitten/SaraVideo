import { useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Form.css";

function VideoUploadForm({ route, onUploadSuccess }) {
  const { id: repositoryId } = useParams();
  const [videoFiles, setVideoFiles] = useState([]); // Para armazenar múltiplos arquivos
  const [loading, setLoading] = useState(false);
  const [currentUploadIndex, setCurrentUploadIndex] = useState(0);
  const navigate = useNavigate();

  // Função para gerar o título baseado na data e hora atuais
  const generateTitle = (index) => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    return `Video - ${formattedDate}`;
  };

  const handleFileChange = (e) => {
    setVideoFiles(e.target.files); // Armazena múltiplos arquivos
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (videoFiles.length === 0) {
      alert("Please select at least one video file");
      setLoading(false);
      return;
    }

    for (let i = 0; i < videoFiles.length; i++) {
      const videoFile = videoFiles[i];

      const formData = new FormData();
      formData.append("titulo", generateTitle(i)); // Usa um título gerado para cada arquivo
      formData.append("arquivo", videoFile);

      try {
        await api.post(route, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert(`Video ${i + 1} uploaded successfully!`);
      } catch (error) {
        alert(`Failed to upload video ${i + 1}.`);
        console.error("Error uploading the video:", error);
      }
    }

    // Callback de sucesso e navegação
    if (onUploadSuccess) onUploadSuccess();
    navigate(`/repositorios/${repositoryId}/`);

    setLoading(false);
  };

  return (
    <div id="form-page">
      <form onSubmit={handleSubmit} className="form-container-u">
        <h1>Upload Multiple Videos</h1>
        <h4>Select videos to upload</h4>
        <input
          className="form-input-u-video"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          multiple // Permite a seleção de múltiplos arquivos
        />
        <button
          className="form-button-u especial"
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Videos"}
        </button>
      </form>
    </div>
  );
}

export default VideoUploadForm;
