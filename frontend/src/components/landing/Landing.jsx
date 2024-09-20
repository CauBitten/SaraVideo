import NavBarLanding from "./NavBarLanding.jsx";
import BodyLanding from "./BodyLanding.jsx";
import "../../styles/Landing.css";

function Landing() {
    return (
        <div className="landing-container">
            <NavBarLanding />
            <BodyLanding />
        </div>
    );
}

export default Landing;
