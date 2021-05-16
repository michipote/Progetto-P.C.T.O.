import React from "react";
import { Button, Layout, Result } from 'antd';
import { Link } from "react-router-dom";

export default function Error403(props) {
    return (
        <>
            <Layout className="site-layout">
                <Result
                    status="403"
                    title="Error 403"
                    subTitle="Non hai l'autorizzazione ad accedere a questa pagina"
                    extra={<Button type="primary"><Link to="/">Ritorna all'Home</Link></Button>}
                />
            </Layout>
        </>
    );
}