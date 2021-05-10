import React, { useEffect, useState } from "react";
import { Button, Layout, Space, Table, Tag } from 'antd';
import { Link } from "react-router-dom";
import Column from "antd/lib/table/Column";
const { getData, postData } = require('../ws');

const { Header, Sider, Content } = Layout;

export default function ReservationsList(props) {
  // Dati della tabella
  const [data, setData] = useState([]);


  // const data = [
  //   {
  //     key: '1',
  //     fiscale: 'PTTMHL02A03B157G',
  //     data: '2021-05-03',
  //     data_prenotazione: '2021-05-07'
  //   },
  //   {
  //     key: '2',
  //     fiscale: 'PLAFLG94L54L682I',
  //     data: '2021-05-03',
  //     data_prenotazione: '2021-05-07'
  //   },
  //   {
  //     key: '3',
  //     fiscale: 'NDRLRN87D66F205K',
  //     data: '2021-05-03',
  //     data_prenotazione: '2021-05-07'
  //   },
  // ];

  useEffect(() => {
    postData("http://localhost:63342/server-side/listaPrenotazioniSede.php", { sede: 1 }).then(data => {
      let formattedData = data.map((item, index) => {
        return {key: '' + index + 1, num: index + 1, ...item}
      })
      setData(formattedData);
    })
  }, [])

  return (
    <>
      <Layout className="site-layout">
        <Header className="layout-header">
          <h2>Lista delle prenotazioni</h2>
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
                  <Button type="primary"></Button>
                </>
              )}
            />
          </Table>
        </Content>
      </Layout>
    </>
  );
}