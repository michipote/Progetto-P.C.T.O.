import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Radio, Col, Row } from 'antd';
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import ConfirmModal from "./ConfirmModal";
import { AppContext } from "../..";
const { getData, postData } = require('../../ws');

//> Form di annullamento di una prenotazione
export default function Annulment(props) {
    const [form] = Form.useForm();

    const { state, dispatch } = useContext(AppContext);

    //> Modal state
    const [modal, setModalState] = useState({
        loading: false,
        visible: false,
    });

    //> Valori della prenotazione da cancellare
    const [values, setValues] = useState({});

    //> Proprietà layout
    const formItemLayout = {
        labelCol: {
            span: 0,
        },
        wrapperCol: {
            span: 5,
        },
    };

    //> Funzione chiamata una volta fatto la submit
    const onFinish = (values) => {
        setValues({ ...values });
        setModalState({ ...modal, visible: true });
    }

    useEffect(() => {
        dispatch({ type: 'change selectedKey', payload: { selectedKey: 'annullamento' } });
    }, [])

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header">
                    <h2 className="header-title">Annulla prenotazione</h2>
                </Header>
                <Content className="layout-content">
                    <h4>Inserisci il codice univoco della prenotazione da annullare</h4>
                    <Form
                        {...formItemLayout}
                        layout={'horizontal'}
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name={['fiscale']}
                            label="Codice fiscale"
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
                            <Input maxLength={16} />
                        </Form.Item>

                        <Form.Item
                            name={['univoco']}
                            label="Codice univoco"
                            rules={[
                                {
                                    required: true,
                                    message: 'Inserisci il codice univoco della prenotazione'
                                },
                                { min: 20, message: 'Il codice deve avere 20 caratteri' },
                            ]}
                        >
                            <Input maxLength={20} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Annulla prenotazione
                            </Button>
                        </Form.Item>
                        <ConfirmModal modal={[modal, setModalState]} values={values} />
                    </Form>
                </Content>
                <Footer className="page-footer">Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
            </Layout>
        </>
    );
}