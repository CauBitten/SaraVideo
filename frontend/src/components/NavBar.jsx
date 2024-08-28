import React from 'react';
import { Layout, Menu, Input, Button } from 'antd';
import { SearchOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const NavBar = () => {
  return (
    <Header className="custom-header">
      <Menu theme="dark" mode="horizontal" className="custom-menu">
        <Menu.Item key="1" className="custom-menu-item">Overview</Menu.Item>
        <Menu.Item key="2" className="custom-menu-item">Repositories</Menu.Item>
      </Menu>
      <div className="custom-logout-container">
        <Button type="default" icon={<LogoutOutlined />} className="custom-logout-button">Logout</Button>
      </div>
    </Header>
  );
};

export default NavBar;
