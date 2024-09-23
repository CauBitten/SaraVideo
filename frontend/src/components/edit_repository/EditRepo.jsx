import EditRepoForm from "./EditRepoForm";
import DeleteRepositoryButton from "./DeleteRepoButton";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import "../../styles/EditRepo.css"

function EditRepo() {
  const { id } = useParams();

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="edit-repo-container" >
        <EditRepoForm />
        <DeleteRepositoryButton repositoryId={id} />
      </div>
    </div>
  );
}

export default EditRepo;
