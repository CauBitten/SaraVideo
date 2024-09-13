import { Layout, Menu, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom"; // Importa useLocation
import { useState, useEffect } from "react"; // Importa useEffect para rastrear mudanças de rota
import "../styles/NavBar.css"; // Adicione o CSS personalizado

const { Header } = Layout;

const NavBar = () => {
  const navigate = useNavigate(); // Hook para navegação
  const location = useLocation(); // Hook para obter a rota atual
  const [selectedKey, setSelectedKey] = useState(null); // Estado para controlar o item selecionado

  // Atualiza o estado com base na URL atual
  useEffect(() => {
    if (location.pathname === '/overview') {
      setSelectedKey('1'); // Define "Overview" como selecionado
    } else if (location.pathname === '/') {
      setSelectedKey('2'); // Define "Repositories" como selecionado
    } else {
      setSelectedKey(null); // Remove a seleção para outras páginas
    }
  }, [location]); // Executa sempre que a rota mudar

  const handleMenuClick = (key, path) => {
    setSelectedKey(key); // Atualiza o item selecionado
    navigate(path); // Redireciona para o caminho fornecido
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Header className="custom-header">
      <Menu
        theme="dark"
        mode="horizontal"
        className="custom-menu"
        selectedKeys={[selectedKey]} // Define o item selecionado pelo estado
      >
        <Menu.Item
          key="1"
          className={`custom-menu-item-over ${selectedKey === '1' ? 'selected' : ''}`} // Adiciona a classe 'selected' condicionalmente
          onClick={() => handleMenuClick('1', '/overview')} // Redireciona para overview e atualiza o estado
        >
          Overview
        </Menu.Item>

        <Menu.Item
          key="2"
          className={`custom-menu-item-repo ${selectedKey === '2' ? 'selected' : ''}`} // Adiciona a classe 'selected' condicionalmente
          onClick={() => handleMenuClick('2', '/')} // Redireciona para repositórios e atualiza o estado
        >
          Repositories
        </Menu.Item>
      </Menu>

      <div className="custom-logout-container">
        <Button
          type="default"
          icon={<LogoutOutlined />}
          className="custom-logout-button"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default NavBar;
