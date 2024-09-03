import EditRepoForm from "../components/EditRepoForm";
import DeleteRepositoryButton from "../components/DeleteRepoButton";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function EditRepo() {
    const { id } = useParams();

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <EditRepoForm />
                <DeleteRepositoryButton repositoryId={id} />
            </div>
        </div>
    );
}

export default EditRepo;
