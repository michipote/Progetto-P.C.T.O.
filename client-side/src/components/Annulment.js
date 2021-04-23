import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button } from 'antd';
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";

// Form di prenotazione
export default function Annulment(props) {
    const [form] = Form.useForm();

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header">
                    <h2>Annulla prenotazione</h2>
                </Header>
                <Content className="layout-content">
                    // TODO Inserisci il form di annullamento
                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
            </Layout>
        </>
    );
}