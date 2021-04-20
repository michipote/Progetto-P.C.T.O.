import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button } from 'antd';
import Layout, { Content, Header } from "antd/lib/layout/layout";


// Form di prenotazione
export function Annulment(props) {
    const [form] = Form.useForm();

    return (
        <>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 10, paddingLeft: 15 }}>
                    <h2>Annulla prenotazione</h2>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    // TODO Inserisci il form di annullamento
                </Content>
            </Layout>
        </>
    );
}