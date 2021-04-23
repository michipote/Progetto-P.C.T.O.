import React, { useEffect, useState } from "react";

import { Layout} from 'antd';

const { Header, Sider, Content } = Layout;

export default function Home(props) {
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
    <>
      <Layout className="site-layout">
        <Header className="layout-header" style={{ padding: 10, paddingLeft: 15 }}>
          <h2>Homepage</h2>
        </Header>
        <Content
          className="layout-content"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          //TODO Contenuto dell'homepage
        </Content>
      </Layout>
    </>
  );
}