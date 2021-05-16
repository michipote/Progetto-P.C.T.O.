import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, Image, Row, Col, message } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import assets from "../assets/*.png";
import { BarcodeOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { AppContext } from '..';
import { Redirect } from 'react-router';
const { getData, postData } = require('../ws');

export default function Registration(props) {
    const [form] = Form.useForm();
    const { state, dispatch } = useContext(AppContext);

    const [response, setResponse] = useState({});

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

    //> La registrazione è avvenuta con successo
    const success = () => {
        message.success('Registrazione avvenuta con successo');
    };

    //> La registrazione è fallita
    const error = (msg) => {
        message.error(msg);
    };

    useEffect(() => {
        dispatch({ type: 'change selectedKey', payload: { selectedKey: 'registrazione' } });
    }, [])

    const onFinish = (values) => {
        postData('http://localhost:63342/server-side/registrazione.php', { ...values })
            .then(data => {
                data?.result === 'failed' ? error(data?.motivo) : (success(), setResponse(data));
            });
    };

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header">
                    <h2 className="header-title">Registrazione</h2>
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
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nome" style={{ marginTop: 20 }} />
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
                                    {
                                        min: 16,
                                        message: 'Deve essere di 16 caratteri'
                                    }
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
                                    {
                                        response?.result === 'succ' ?
                                            <Redirect to="/login"></Redirect>
                                            : null
                                    }
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