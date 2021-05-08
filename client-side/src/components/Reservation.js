import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, DatePicker, Space, Dropdown, Menu, Select, Cascader } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import moment from "moment";
import { Option } from "antd/lib/mentions";
const { getData, postData } = require('../ws');

// Form di prenotazione
export default function Reservation(props) {
    // Date non disponibili
    const [unavailableDates, setUnavailableDates] = useState(null);

    // Lista sedi
    const [siteList, setSiteList] = useState([]);

    // Sede scelta
    const [site, setSite] = useState("Scegli una sede");

    // Limiti (min e max) del DatePicker, DAL GIORNO CORRENTE (OGGI)
    const min = 3;
    const max = 17;

    // Proprietà layout
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 5 }
    };

    // Config del DatePicker
    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Scegli una data',
            },
        ],
    };

    // Messaggio visualizzato se trova dei campi vuoti, ma obbligatori
    const validateMessages = {
        required: 'Campo obbligatorio',
    };

    // Disabilita nel DatePicker le date non disponibili
    const disabledDate = (current) => {
        // Date da disabilitare, ottenute dal server database
        let datesToDisable = unavailableDates?.map(elem => elem.data);

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
        let formattedValues = { ...values, data: values.data.format('YYYY-MM-DD') };

        postData('http://localhost:63342/server-side/lista_prenotazioni.php', formattedValues)
            .then(data => {
                // console.log(data); RISPOSTA
            });
    };

    // Una volta montato il componente, fa un rischiesta al server database per ottenere le date non disponibili
    useEffect(() => {
        getData('http://localhost:63342/server-side/listaSedi.php').then(data => {
            setSiteList(Object.entries(data));
        });
    }, [])

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
                                {
                                    min: 16,
                                    message: 'Deve essere di 16 caratteri'
                                }
                            ]}
                        >
                            <Input maxLength={16} />
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
                            <Cascader
                                options={
                                    siteList.map(x => {
                                        return {
                                            value: x[0],
                                            label: x[0],
                                            children: x[1]
                                        }
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item name={['data']} label="Data" {...config} >
                            <DatePicker placeholder="Scegli la data" format="DD MMMM YYYY" disabledDate={disabledDate} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 2 }}>
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