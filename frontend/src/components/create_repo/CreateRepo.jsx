import NavBar from "../NavBar.jsx";
import RepoForm from "./RepoForm.jsx";

function CreateRepo() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          padding: "20px",
        }}
      >
        <RepoForm route="/api/repositorio/create/" />
      </div>
    </div>
  );
}

export default CreateRepo;
