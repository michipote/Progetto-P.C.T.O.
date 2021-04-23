import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
const { getData, postData } = require('../ws');

// Form di prenotazione
export default function Reservation(props) {
    const layout = {
        labelCol: {
            span: 0,
        },
        wrapperCol: {
            span: 8,
        },
    };

    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Scegli una data',
            },
        ],
    };

    const validateMessages = {
        required: 'Campo obbligatorio',
    };

    const onFinish = (values) => {
        let formattedValues = { ...values, data: values.data.format('YYYY-MM-DD') };

        postData('http://localhost:63342/server-side/lista_prenotazioni.php', formattedValues)
            .then(data => {
                console.log(data);
            });
    };

    // useEffect(() => {
    //     getUnavailableDates('http://localhost:63342/server-side/nonDisponibili.php');
    // }, [])

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header">
                    <h2>Portale prenotazioni</h2>
                </Header>
                <Content className="layout-content">
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name={['codice_fiscale']}
                            label="Codice fiscale"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input maxLength={16} />
                        </Form.Item>

                        <Form.Item name={['data']} label="Data" {...config} >
                            <DatePicker placeholder="Scegli la data" format="DD MMMM YYYY" />
                        </Form.Item>

                        <Form.Item
                            name={['sede']}
                            label="Sede"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Prenota
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
            </Layout>
        </>
    );
}