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

  const {state, dispatch} = useContext(AppContext);

  useEffect(() => {
    dispatch({type: 'change selectedKey', payload: {selectedKey: 'lista_prenotazioni'}});
    postData("http://localhost:63342/server-side/listaPrenotazioniSedi.php", { sede: 1 }).then(data => {
      let formattedData = data.map((item, index) => {
        return { key: '' + index + 1, num: index + 1, ...item }
      })
      setData(formattedData);
    })
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
            <Column title="Codice Fiscale" dataIndex="fiscale" key="fiscale" />
            <Column title="Giorno di prenotazione" dataIndex="data" key="data" />
            <Column title="Prenotato per il:" dataIndex="data_prenotazione" key="data_prenotazione" />
            <Column title="Azione" key="azione"
              render={() => (
                <>
                  <Link to="/esegui_tampone">Esegui tampone</Link>
                </>
              )}
            />
          </Table>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
      </Layout>
    </>
  );
}