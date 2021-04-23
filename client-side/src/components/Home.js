import React, { useEffect, useState } from "react";
import { Layout} from 'antd';

const { Header, Sider, Content } = Layout;

export default function Home(props) {
  const [state, setState] = useState({
    collapsed: false
  });

  return (
    <>
      <Layout className="site-layout">
        <Header className="layout-header">
          <h2>Kan Vax</h2>
        </Header>
        <Content className="layout-content">
          //TODO Contenuto dell'homepage
        </Content>
      </Layout>
    </>
  );
}