import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Layout, Row } from 'antd';
import { Footer } from "antd/lib/layout/layout";
import { AppContext } from "..";

const { Header, Sider, Content } = Layout;

export default function InfectionMap(props) {

    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        dispatch({ type: 'change selectedKey', payload: { selectedKey: 'mappa_contagio' } });
    }, [])

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header" style={{ backgroundColor: '#222222' }}>
                    <h2 className="header-title" style={{ color: 'lightgray' }}>Mappa contagio</h2>
                </Header>
                <iframe src="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6" style={{ width: '100%', height: '100%' }}></iframe>
                <Footer style={{ textAlign: 'center', backgroundColor: '#222222', color: 'lightgray' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
            </Layout>
        </>
    );
}