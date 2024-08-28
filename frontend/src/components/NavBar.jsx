import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const NavBar = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleRepositoriesClick = () => {
    navigate('/'); // Redireciona para a página inicial
  };

  return (
    <Header className="custom-header">
      <Menu theme="dark" mode="horizontal" className="custom-menu">
        <Menu.Item key="1" className="custom-menu-item">Overview</Menu.Item>
        <Menu.Item key="2" className="custom-menu-item" onClick={handleRepositoriesClick}>
          Repositories
        </Menu.Item>
      </Menu>
      <div className="custom-logout-container">
        <Button type="default" icon={<LogoutOutlined />} className="custom-logout-button">Logout</Button>
      </div>
    </Header>
  );
};

export default NavBar;
