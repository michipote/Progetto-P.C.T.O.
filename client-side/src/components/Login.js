import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Image, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { AppContext } from "..";
import assets from "../assets/*.png";
import { Redirect } from "react-router";
const { getData, postData } = require('../ws');

export default function Login(props) {
    const { state, dispatch } = useContext(AppContext);
    const [response, setResponse] = useState({});

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 1,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 6,
                offset: 0,
            },
            sm: {
                span: 6,
                offset: 9,
            },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: { offset: 9, span: 0 },
    };

    //> Login avvenuto con successo
    const success = () => {
        message.success('Login avvenuto con successo');
    };

    //> Login fallito
    const error = (msg) => {
        message.error(msg);
    };

    const onFinish = (values) => {
        postData('http://localhost:63342/server-side/login.php', { ...values })
            .then(data => {
                data?.result === 'failed' ? error(data?.motivo) :
                    (
                        success(),
                        dispatch({ type: 'login', payload: { user: { ...data } } }),
                        localStorage.setItem('user', JSON.stringify({ ...data }))
                    );
            });
    };

    useEffect(() => {
        dispatch({ type: 'change selectedKey', payload: { selectedKey: 'login' } });
    }, [])

    return (
        <Layout className="site-layout">
            <Header className="layout-header">
                <h2 className="header-title">Login</h2>
            </Header>
            <Content className="layout-content">
                <div className="login-form-container">
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8} style={{ display: 'flex' }}>
                            <img style={{ margin: 'auto' }} width={165} src={assets.swab}></img>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                    <Form
                        {...formItemLayout}
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: ''
                                },
                                {
                                    required: true,
                                    message: "Inserisci l'email"
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" style={{ marginTop: 30 }} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Inserisci la password'
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Accedi
                                {
                                    state.user !== null ?
                                        <Redirect to="/"></Redirect>
                                        : null
                                }
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
        </Layout>
    );
};
