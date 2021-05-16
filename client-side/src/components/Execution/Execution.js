import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Radio, Col, Row } from 'antd';
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import ExeConfirmModal from "./ExeConfirmModal";
import { AppContext } from "../..";
const { getData, postData } = require('../../ws');

//> Form di annullamento di una prenotazione
export default function Execution(props) {
    const [form] = Form.useForm();

    //> App context
    const { state, dispatch } = useContext(AppContext);

    //> Modal state
    const [modal, setModalState] = useState({
        loading: false,
        visible: false,
    });

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
        setValues({ ...values, id_operatore: state.user.id, id_sede: state.user.sede[0].id_sede });

        setModalState({ ...modal, visible: true });
    }

    //> Messaggio visualizzato se trova dei campi vuoti, ma obbligatori
    const validateMessages = {
        required: 'Campo obbligatorio',
    };

    useEffect(() => {
        dispatch({ type: 'change selectedKey', payload: { selectedKey: 'esecuzione' } });
    }, [])

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header">
                    <h2 className="header-title">Esecuzione tampone</h2>
                </Header>
                <Content className="layout-content">
                    <h4>Inserisci il codice univoco della prenotazione per eseguire il tampone</h4>
                    <Form
                        {...formItemLayout}
                        layout={'horizontal'}
                        form={form}
                        onFinish={onFinish} validateMessages={validateMessages}
                    >
                        <Form.Item
                            name={['univoco']}
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
                                Esegui tampone
                            </Button>
                        </Form.Item>
                        <ExeConfirmModal modal={[modal, setModalState]} values={values} />
                    </Form>
                </Content>
                <Footer className="page-footer">Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
            </Layout>
        </>
    );
}