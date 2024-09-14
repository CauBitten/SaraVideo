import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom"; // Importa useLocation
import "../../styles/NavBarLanding.css"; // Adicione o CSS personalizado

const { Header } = Layout;

function NavBarLanding() {
    const navigate = useNavigate(); // Hook para navegação
  
    const handleMenuClick = (path) => {
      navigate(path);       // Redireciona para o caminho fornecido
    };
  
    return (
      <Header className="custom-header">
        
        <div className="logo-container">
            <img src="/assets/lit.svg" alt="logo" className="logo"/>    
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          className="custom-menu"
        >
          <Menu.Item
            className={`custom-menu-item-login`} 
            onClick={() => handleMenuClick('/login')} // Redireciona para login 
          >
            Sign In
          </Menu.Item>
  
          <Menu.Item
            className={`custom-menu-item-register`} 
            onClick={() => handleMenuClick('/register')} // Redireciona para sign up 
          >
            Sign Up
          </Menu.Item>
        </Menu>
      </Header>
    );
}

export default NavBarLanding;