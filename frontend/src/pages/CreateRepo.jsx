import NavBar from "../components/NavBar.jsx"
import RepoForm from "../components/RepoForm.jsx"

function CreateRepo() {
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <RepoForm route="/api/repositorio/create/" />
            </div>
        </div>
    )
}

export default CreateRepo