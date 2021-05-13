import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Layout, Row } from 'antd';
import { Footer } from "antd/lib/layout/layout";
import { AppContext } from "..";
import Meta from "antd/lib/card/Meta";

const { Header, Sider, Content } = Layout;

export default function Vaccines(props) {

    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        dispatch({ type: 'change selectedKey', payload: { selectedKey: 'situazione_vaccini' } });
    }, [])

    return (
        <>
            <Layout className="site-layout">
                <Header className="layout-header">
                    <h2>Situazione delle vaccinazioni in Italia</h2>
                </Header>
                <Content className="layout-content">
                    <Card
                        hoverable
                        cover={<iframe src="https://lab24.ilsole24ore.com/_grafici/coronavirus-vaccini/vaccini-00-intro/index.html?v=832768" style={{ width: '100%', height: '802px' }}></iframe>}
                        title="Andamento delle vaccinazioni in Italia"
                    >
                        <Meta title="Fonte: Il Sole 24 Ore" description={<a href="https://lab24.ilsole24ore.com/numeri-vaccini-italia-mondo/" target="_blank" rel="noopener noreferrer">https://lab24.ilsole24ore.com/numeri-vaccini-italia-mondo/</a>} />
                    </Card>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Card
                                hoverable
                                cover={<iframe src="https://flo.uri.sh/visualisation/4899981/embed" style={{ width: '100%', height: '700px' }}></iframe>}
                                style={{maxHeight: '700px'}}
                            >
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card
                                hoverable
                                cover={<iframe src="https://flo.uri.sh/visualisation/4931231/embed" style={{ width: '100%', height: '700px' }}></iframe>}
                                style={{maxHeight: '700px'}}
                            >
                            </Card>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Singh Karanbir, Michele Potettu, Patrik Maniu, Vasile Laura. All rights riserved.</Footer>
            </Layout>
        </>
    );
}