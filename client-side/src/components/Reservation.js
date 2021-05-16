import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, DatePicker, Space, Dropdown, Menu, Select, Cascader, Result } from 'antd';
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import moment from "moment";
import { AppContext } from "..";
import Paragraph from "antd/lib/skeleton/Paragraph";
import { CloseCircleOutlined } from "@ant-design/icons";
const { getData, postData } = require('../ws');

// Form di prenotazione
export default function Reservation(props) {
    // Date non disponibili
    const [unavailableDates, setUnavailableDates] = useState(null);

    const { state, dispatch } = useContext(AppContext);

    // Lista sedi
    const [siteList, setSiteList] = useState([]);

    // Sede selezionato
    const [selectedSite, setSelectedSite] = useState(null);

    const [response, setResponse] = useState({});

    // Limiti (min e max) del DatePicker, DAL GIORNO CORRENTE (OGGI)
    const min = 3;
    const max = 17;

    // Proprietà layout
    const layout = {
        labelCol: {
            span: 0,
        },
        wrapperCol: {
            span: 5,
        },
    };

    // Disabilita nel DatePicker le date non disponibili
    const disabledDate = (current) => {
        // Date da disabilitare, ottenute dal server database
        let datesToDisable = unavailableDates?.map(elem => elem.data_disabilitata);

        // Data da disabilitare
        let date = datesToDisable?.find((elem) => moment(current).format('YYYY-MM-DD') === elem);

        // Ritorna true per:
        // - tutte le date successive la giorno corrente di 3 (per adesso) giorni
        // - se current (ogni data del mese) equivale ad una data disabilitata
        return current < moment().add(min, 'days')
            || current > moment().add(max, 'days')
            || (current > moment(date) && current < moment(date).add(1, 'days'));
    };

    // Funzione chiamata una volta fatto il submit
    const onFinish = (values) => {
        let formattedValues = { fiscale: values.fiscale, data_prenotazione: values.data.format('YYYY-MM-DD'), id_sede: selectedSite };

        postData('http://localhost:63342/server-side/prenota.php', formattedValues)
            .then(data => {
                setResponse(data);
            });
    };

    const getDisabledDates = (temp, value) => {
        if (temp.length === 0) {
            return;
        }
        setSelectedSite(value[1]?.id);
        postData('http://localhost:63342/server-side/nonDisponibili.php', { sede: value[1]?.id })
            .then(data => {
                setUnavailableDates(data)
            });
    }

    // Una volta montato il componente, fa un rischiesta al server database per ottenere le date non disponibili
    useEffect(() => {
        dispatch({ type: 'change selectedKey', payload: { selectedKey: 'prenotazione' } });
        getData('http://localhost:63342/server-side/listaSedi.php').then(data => {
            setSiteList(Object.entries(data));
        });
    }, [])

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header">
                    <h2 className="header-title">Portale prenotazioni</h2>
                </Header>
                <Content className="layout-content">
                    <h4>Per prenotare un tampone, completa i seguenti campi</h4>
                    <Form {...layout} name="nest-messages" onFinish={onFinish}>
                        <Form.Item
                            name={['fiscale']}
                            label="Codice fiscale"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    min: 16,
                                    message: 'Deve essere di 16 caratteri'
                                }
                            ]}
                            initialValue={state?.user?.fiscale}
                        >   
                            <Input maxLength={16} />
                        </Form.Item>

                        <Form.Item
                            name={['sede']}
                            label="Sede"
                            rules={[
                                {
                                    required: true,
                                    message: 'Seleziona una sede'
                                },
                            ]}
                        >
                            <Cascader
                                options={
                                    siteList.map((x, i) => {
                                        return {
                                            value: x[0],
                                            label: x[0],
                                            children: x[1]
                                        }
                                    })
                                }
                                placeholder="Seleziona una sede"
                                onChange={getDisabledDates}
                            />
                        </Form.Item>

                        <Form.Item
                            name={['data']}
                            label="Data"
                            rules={[
                                {
                                    type: 'object',
                                    required: true,
                                    message: 'Seleziona una data'
                                },
                            ]}>
                            <DatePicker placeholder="Scegli la data" format="DD MMMM YYYY" disabledDate={disabledDate} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Prenota
                            </Button>
                        </Form.Item>
                    </Form>
                    {
                        response?.risultato === 'succ' ?
                            <Result
                                status="success"
                                title="Prenotazione avvenuta con successo!"
                                subTitle="Scannerizza il codice QR per ottenere il codice univoco della prenotazione."
                                extra={[
                                    <img key='qr' src={"https://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=" + response?.univoco}></img>,
                                    <h2 key='univoco'>{response?.univoco}</h2>
                                ]}
                            />
                            : null
                    }
                    {
                        response?.risultato === 'failed' ?
                            <Result
                                status="error"
                                title="Prenotazione fallita"
                                subTitle={response?.motivo}
                            >
                            </Result>
                            : null
                    }
                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
            </Layout>
        </>
    );
}