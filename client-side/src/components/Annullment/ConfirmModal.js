import { Button, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const { getData, postData } = require('../../ws');

//> Modale che appare per chiedere conferma all'utente
export default function ConfirmModal(props) {

    //> L'annullamento è avvenuto con successo
    const success = () => {
        message.success('Prenotazione annullata con successo');
    };

    //> L'annullamento è fallito
    const error = (msg) => {
        message.error(msg);
    };

    //> Annullamento della prenotazione
    const handleOk = () => {
        props.modal[1]({ ...props.modal[0], loading: true });
        postData('http://localhost:63342/server-side/annulla_prenotazione.php', { ...props.values })
            .then(data => {
                props.modal[1]({ visible: false, loading: false });
                data.risultato === 'succ' ? success() : error(data.motivo);
            });
    };

    //> Annullamento della prenotazione non eseguito
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
                    <Button key="confirm" type="primary" danger loading={props.modal[0].loading} onClick={handleOk}>
                        Conferma
                    </Button>
                ]}
            >
                <h4>Sei sicuro di voler annullare la prenotazione?</h4>
            </Modal>
        </>
    );
}