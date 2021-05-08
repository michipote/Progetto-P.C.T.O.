import React, { useEffect, useState } from "react";
import { Layout} from 'antd';
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function ReservationsList(props) {
  return (
    <>
      <Layout className="site-layout">
        <Header className="layout-header">
          <h2>Lista delle prenotazioni</h2>
        </Header>
        <Content className="layout-content">
          //TODO Contenuto dell'homepage

        </Content>
      </Layout>
    </>
  );
}