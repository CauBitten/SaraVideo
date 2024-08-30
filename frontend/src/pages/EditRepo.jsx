import EditRepoForm from "../components/EditRepoForm";
import DeleteRepositoryButton from "../components/DeleteRepoButton";
import { useParams } from "react-router-dom";

function EditRepo() {
    const { id } = useParams();

    return (
        <div>
            <h1>Editar Repositório</h1>
            <EditRepoForm />
            <DeleteRepositoryButton repositoryId={id} />
        </div>
    );
}

export default EditRepo;
