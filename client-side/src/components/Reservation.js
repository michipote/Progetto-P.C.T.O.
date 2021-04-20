import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button } from 'antd';
import Layout, { Content, Header } from "antd/lib/layout/layout";


// Form di prenotazione
export function Reservation(props) {
    const [form] = Form.useForm();

    return (
        <>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 10, paddingLeft: 15 }}>
                    <h2>Prenota tampone</h2>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    // TODO Sistema il form di prenotazione
                    {/* <Form
                        layout={'inline'}
                        form={form}
                    >
                        <Form.Item label="Field A">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Field B">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">Submit</Button>
                        </Form.Item>
                    </Form> */}
                </Content>
            </Layout>
        </>
    );
}