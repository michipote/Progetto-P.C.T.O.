import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
const { getData, postData } = require('../../ws');

//> Modale che appare per chiedere conferma all'utente
export default function ConfirmModal(props) {
    //> Annullamento della prenotazione
    const handleOk = () => {


        props.modal[1]({ ...props.modal[0], loading: true });

        // TODO Aspettare lo script in php
        // postData('http://localhost:63342/server-side/<file_name>.php', { key: props.unique_key })
        //     .then(data => {
        //          console.log(data); // RISPOSTA
                    // TODO Controllare le risposte
        //          props.modal[1]({ visible: false, loading: false });
        //     });
    };

    //> Annullamento cancellato la prenotazione
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