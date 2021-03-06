import { Button, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const { getData, postData } = require('../../ws');

//> Modale che appare per chiedere conferma all'utente
export default function ExeConfirmModal(props) {
    //> Tampone avvenuto con successo
    const success = () => {
        message.success('Tampone effettuato con successo');
    };

    //> Tampone fallito
    const error = (msg) => {
        message.error(msg);
    };


    //> Esecuzione del tampone
    const handleOk = () => {
        props.modal[1]({ ...props.modal[0], loading: true });

        postData('http://localhost:63342/server-side/esegui_tampone.php', { ...props.values })
            .then(data => {
                props.modal[1]({ visible: false, loading: false });
                data.risultato === 'succ' ? success() : error(data.motivo);
            });
    };

    //> Esecuzione del tampone annullata
    const handleCancel = () => {
        props.modal[1]({ visible: false, loading: false });
    };

    return (
        <>
            <Modal
                visible={props.modal[0].visible}
                title="Kan Vax"

                onOk={handleOk}
                onCancel={handleCancel}

                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Torna indietro
                    </Button>,
                    <Button key="confirm" type="primary" loading={props.modal[0].loading} onClick={handleOk}>
                        Conferma
                    </Button>
                ]}
            >
                <h4>Conferma esecuzione del tampone</h4>
            </Modal>
        </>
    );
}