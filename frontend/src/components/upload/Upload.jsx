import VideoUploadForm from "./VideoUploadForm";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";

function Upload() {
  const { id } = useParams();

  const uploadUrl = `/api/repositorios/${id}/upload/`;

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <VideoUploadForm route={uploadUrl} />
      </div>
    </div>
  );
}

export default Upload;
