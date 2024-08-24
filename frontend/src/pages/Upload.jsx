import React from 'react';
import VideoUploadForm from '../components/VideoUploadForm';
import { useParams } from 'react-router-dom';

function Upload() {
  const { id } = useParams();

  const uploadUrl = `/api/repositorios/${id}/upload/`;

  return (
    <div>
      <VideoUploadForm route={uploadUrl} />
    </div>
  );
}

export default Upload;
