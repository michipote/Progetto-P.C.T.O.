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

const { Header, Sider, Content } = Layout;

export function Home(props) {
  const [state, setState] = useState({
    collapsed: false
  });

  // Espande/Comprime il menu
  let toggle = () => {
    setState({
      collapsed: !state.collapsed
    });
  };

  return (
    <Layout id="custom-layout" >
      <Sider collapsible collapsed={state.collapsed} onCollapse={toggle}>
        <div>
          {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
            </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            Prenota tampone
            </Menu.Item>
          <Menu.Item key="3" icon={<DeleteFilled />}>
            Annulla prenotazione
            </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Registrazione
            </Menu.Item>
          <Menu.Item key="5" icon={<LoginOutlined />}>
            Login
            </Menu.Item>
        </Menu>
      </Sider>
      
      {props.children}
    </Layout>
  );
}