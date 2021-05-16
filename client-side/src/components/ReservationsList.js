import React, { useContext, useEffect, useState } from "react";
import { Button, Layout, Space, Table, Tag } from 'antd';
import { Link } from "react-router-dom";
import Column from "antd/lib/table/Column";
import { Footer } from "antd/lib/layout/layout";
import { AppContext } from "..";
const { getData, postData } = require('../ws');

const { Header, Sider, Content } = Layout;

export default function ReservationsList(props) {
  // Dati della tabella
  const [data, setData] = useState([]);

  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'change selectedKey', payload: { selectedKey: 'lista_prenotazioni' } });

    if (state?.user?.tipo === '0') {
      postData("http://localhost:63342/server-side/lista_prenotazioni_utente.php", { fiscale: state?.user?.fiscale }).then(data => {
        let formattedData = data.map((item, index) => {
          return { key: '' + index + 1, num: index + 1, ...item }
        })
        setData(formattedData);
        return;
      })
    }
    if (state?.user?.tipo === '1') {
      postData("http://localhost:63342/server-side/listaPrenotazioniSedi.php", { id_sede: state?.user?.sede[0]?.id_sede }).then(data => {
        let formattedData = data.map((item, index) => {
          return { key: '' + index + 1, num: index + 1, ...item }
        })
        setData(formattedData);
        return;
      })
    }
    if (state?.user?.tipo === '2') {
      getData("http://localhost:63342/server-side/lista_prenotazioni.php").then(data => {
        let formattedData = data.map((item, index) => {
          return { key: '' + index + 1, num: index + 1, ...item }
        })
        setData(formattedData);
        return;
      })
    }

  }, [])

  return (
    <>
      <Layout className="site-layout">
        <Header className="layout-header">
          <h2 className="header-title">Lista delle prenotazioni</h2>
        </Header>
        <Content className="layout-content">
          <Table dataSource={data}>
            <Column title="N°" dataIndex="num" key="num" />
            {
              state?.user?.tipo !== '0' ? <><Column title="Codice Fiscale" dataIndex="fiscale" key="fiscale" /></> : null
            }

            <Column title="Giorno di prenotazione" dataIndex="data" key="data" />
            <Column title="Prenotato per il:" dataIndex="data_prenotazione" key="data_prenotazione" />
            {
              state?.user?.tipo !== '1' ? <>
                <Column title="Stato" dataIndex="stato" key="stato" render={(stato, i) => {
                  let color = stato === '0' ? 'blue' : stato === '1' ? 'green' : 'red';
                  let val = stato === '0' ? 'PRENOTATO' : stato === '1' ? 'ESEGUITO' : 'ANNULLATO'
                  return (<Tag color={color} key={i}>{val}</Tag>)
                }
                } />
                <Column title="Zona" dataIndex="nome" key="nome" />
                <Column title="Indirizzo" dataIndex="indirizzo" key="indirizzo" />
              </> : null
            }
            {
              state?.user?.tipo === '1' ?
                <Column title="Azione" key="azione"
                  render={() => (
                    <>
                      <Link to="/esegui_tampone">Esegui tampone</Link>
                    </>
                  )}
                /> : null
            }
          </Table>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
      </Layout>
    </>
  );
}