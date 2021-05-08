import React, { useState } from 'react';
import { Form, Input, Button, Image, Row, Col } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import assets from "../assets/*.png";
import { BarcodeOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

export default function Registration(props) {
    const [form] = Form.useForm();

    const formItemLayout = {
        wrapperCol: {
            xs: {
                span: 8,
                offset: 0,
            },
            sm: {
                span: 8,
                offset: 8,
            },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 0,
                offset: 0,
            },
            sm: {
                span: 0,
                offset: 11,
            },
        },
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        //TODO fetch al backend
    };

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header">
                    <h2>Registrazione</h2>
                </Header>
                <Content className="layout-content">
                    <div>
                        <Row>
                            <Col span={8}></Col>
                            <Col span={8} style={{ display: 'flex' }}>
                                <img style={{ margin: 'auto' }} width={165} src={assets.swab}></img>
                            </Col>
                            <Col span={8}></Col>
                        </Row>
                        
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="nome"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Inserisci il nome'
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nome" style={{marginTop: 20}} />
                            </Form.Item>

                            <Form.Item
                                name="cognome"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Inserisci il cognome'
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Cognome" />
                            </Form.Item>

                            <Form.Item
                                name={['fiscale']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Inserisci il codice fiscale'
                                    },
                                ]}
                            >
                                <Input prefix={<BarcodeOutlined className="site-form-item-icon" />} placeholder="Codice Fiscale" maxLength={16} />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: ''
                                    },
                                    {
                                        required: true,
                                        message: 'Inserisci una email',
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Inserisci una password',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Inserisci di nuovo la password',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('Le password non coincidono'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Conferma password" />
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Registrati
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
            </Layout>
        </>
    );
};