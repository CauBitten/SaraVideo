import EditRepoForm from "./EditRepoForm";
import DeleteRepositoryButton from "./DeleteRepoButton";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";

function EditRepo() {
  const { id } = useParams();

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div style={{ marginTop: "40px" }}>
        <EditRepoForm />
        <DeleteRepositoryButton repositoryId={id} />
      </div>
    </div>
  );
}

export default EditRepo;
