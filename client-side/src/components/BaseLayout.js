import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  CalendarOutlined,
  LoginOutlined,
  UserOutlined,
  EditOutlined,
  UnorderedListOutlined,
  GlobalOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, BrowserRouter } from "react-router-dom";
import { AppContext } from "..";
const { Header, Sider, Content } = Layout;

// Layout base del sito
export default function BaseLayout(props) {
  // State del layout
  const [localstate, setState] = useState({
    collapsed: false
  });

  const { state, dispatch } = useContext(AppContext);

  // Espande/Comprime il menu
  const toggleMenu = () => {
    if (state.selectedKey === 'mappa_contagio' || state.selectedKey === 'situazione_vaccini') {
      return;
    }

    setState({
      collapsed: !localstate.collapsed
    });
  };

  const logout = () => {
    localStorage.clear();
    location.reload();
  }

  return (
    <>
      <BrowserRouter>
        <Layout id="fill-screen">
          <Sider collapsible={true} collapsed={localstate.collapsed} onCollapse={toggleMenu}>
            <div>
              {React.createElement(localstate.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggleMenu,
              })}
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} selectedKeys={[state.selectedKey]}>
              {
                state.user !== null ?
                  <Menu.Item key="user" icon={<UserOutlined style={{ color: '#fec36b' }} />} disabled style={{ WebkitTextFillColor: '#fec36b' }}>
                    {state.user?.cognome + " " + state.user?.nome}
                  </Menu.Item>
                  : null
              }
              <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>

              {
                state.user === null ?
                  <>
                    <Menu.Item key="registrazione" icon={<UserOutlined />}>
                      <Link to="/registrazione">Registrazione</Link>
                    </Menu.Item>
                    <Menu.Item key="login" icon={<LoginOutlined />}>
                      <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="prenotazione" icon={<CalendarOutlined />}>
                      <Link to="/prenotazione">Prenota tampone</Link>
                    </Menu.Item>
                    <Menu.Item key="annullamento" icon={<DeleteOutlined />}>
                      <Link to="/annullamento">Annulla prenotazione</Link>
                    </Menu.Item>
                  </>
                  :
                  state.user.tipo == '1' ?
                    <>
                      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                        Logout
                      </Menu.Item>
                      <Menu.Item key="esecuzione" icon={<EditOutlined />}>
                        <Link to="/esegui_tampone">Esegui tampone</Link>
                      </Menu.Item>
                      <Menu.Item key="lista_prenotazioni" icon={<UnorderedListOutlined />}>
                        <Link to="/lista_prenotazioni">Lista prenotazioni</Link>
                      </Menu.Item>
                    </>
                    :
                    state.user.tipo == '0' ?
                      <>
                        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                          Logout
                        </Menu.Item>
                        <Menu.Item key="prenotazione" icon={<CalendarOutlined />}>
                          <Link to="/prenotazione">Prenota tampone</Link>
                        </Menu.Item>
                        <Menu.Item key="annullamento" icon={<DeleteOutlined />}>
                          <Link to="/annullamento">Annulla prenotazione</Link>
                        </Menu.Item>
                        <Menu.Item key="lista_prenotazioni" icon={<UnorderedListOutlined />}>
                          <Link to="/lista_prenotazioni">Lista prenotazioni</Link>
                        </Menu.Item>
                      </> :
                      <>
                        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                          Logout
                        </Menu.Item>
                        <Menu.Item key="lista_prenotazioni" icon={<UnorderedListOutlined />}>
                          <Link to="/lista_prenotazioni">Lista prenotazioni</Link>
                        </Menu.Item>
                      </>
              }

              <Menu.Item key="mappa_contagio" icon={<ShareAltOutlined />}>
                <Link to="/mappa_contagio">Mappa contagio</Link>
              </Menu.Item>
              <Menu.Item key="situazione_vaccini" icon={<GlobalOutlined />}>
                <Link to="/situazione_vaccini">Situazione vaccini</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          {props.children}
        </Layout>
      </BrowserRouter>
    </>
  );
}