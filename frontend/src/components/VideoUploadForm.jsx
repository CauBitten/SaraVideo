import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

function VideoUploadForm({ route }) {
    const [title, setTitle] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!videoFile || !title) {
            alert('Please fill all the fields and select a video file');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('titulo', title);
        formData.append('arquivo', videoFile);

        try {
            await api.post(route, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Video uploaded successfully!');
            navigate("/");
        } catch (error) {
            alert('Failed to upload video.');
            console.error('There was an error uploading the video:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Upload Video</h1>
            <input
                className="form-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                className="form-input"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
            />
            <button className="form-button" type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Video'}
            </button>
        </form>
    );
}

export default VideoUploadForm;
