import React, { useEffect, useState } from "react";

import { Button, Layout, Menu, Tooltip } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  DeleteFilled,
  CalendarOutlined,
  LoginOutlined,
  UserOutlined
} from '@ant-design/icons';

import { Link, BrowserRouter } from "react-router-dom";

const { Header, Sider, Content } = Layout;

// Layout del sito
export default function BaseLayout(props) {
  const [state, setState] = useState({
    collapsed: false
  });

  // Espande/Comprime il menu
  let toggle = () => {
    setState({
      collapsed: !state.collapsed
    });
  };

  function changeURL(route) {
    console.log(route);
    window.location.href = "http://localhost:1234" + route;
  }

  return (
    <>
      <BrowserRouter>
        <Layout id="fill-screen">
          <Sider collapsible collapsed={state.collapsed} onCollapse={toggle}>
            <div>
              {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<CalendarOutlined />}>
                <Link to="/prenotazione">Prenota tampone</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<DeleteFilled />}>
                <Link to="/annullamento">Annulla prenotazione</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                <Link to="/registrazione">Registrazione</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          {props.children}
        </Layout>
      </BrowserRouter>
    </>
  );
}