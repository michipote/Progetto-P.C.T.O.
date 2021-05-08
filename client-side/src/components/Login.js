import React, { useContext } from "react";
import { Form, Input, Button, Checkbox, Image, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { AppContext } from "..";
import assets from "../assets/*.png";
import { useState } from "react";

export default function Login(props) {
    const { state, dispatch } = useContext(AppContext);
    
    const validateMessages = {
        required: 'Campo obbligatorio'
    }

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

    const onFinish = (values) => {
        // console.log(values);
        dispatch({ type: 'login', payload: { email: values.email } });
        //TODO fetch al backend
        //TODO Salvare i dati nel context (comunque si deve gestire la risposta)
    };

    return (
        <Layout className="site-layout">
            <Header className="layout-header">
                <h2>Login</h2>
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
                        validateMessages={validateMessages}
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
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
        </Layout>
    );
};
