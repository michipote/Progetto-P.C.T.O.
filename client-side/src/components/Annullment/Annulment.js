import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Col, Row } from 'antd';
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import ConfirmModal from "./ConfirmModal";
const { getData, postData } = require('../../ws');

//> Form di annullamento di una prenotazione
export default function Annulment(props) {
    const [form] = Form.useForm();

    //> Modal state
    const [modal, setModalState] = useState({
        loading: false,
        visible: false,
    });

    //> Chiave univoco
    const [key, setKey] = useState(null)

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
        setKey(values.key);

        setModalState({ ...modal, visible: true });
    }

    //> Messaggio visualizzato se trova dei campi vuoti, ma obbligatori
    const validateMessages = {
        required: 'Campo obbligatorio',
    };

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header">
                    <h2>Annulla prenotazione</h2>
                </Header>
                <Content className="layout-content">
                    <h4>Inserisci il codice univoco della prenotazione da annullare</h4>
                    <Form
                        {...formItemLayout}
                        layout={'horizontal'}
                        form={form}
                        onFinish={onFinish} validateMessages={validateMessages}
                    >
                        <Form.Item
                            name={['key']}
                            label="Codice univoco"
                            rules={[
                                {
                                    required: true,
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
                        <ConfirmModal modal={[modal, setModalState]} unique_key={key} />
                    </Form>
                </Content>
                <Footer className="page-footer">Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
            </Layout>
        </>
    );
}