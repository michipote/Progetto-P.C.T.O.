import React, { useState, useEffect } from "react";
import { Route} from "react-router";
import Annulment from "./components/Annullment/Annulment";
import Home from "./components/Home";
import Reservation from "./components/Reservation";
import itIT from "antd/es/locale/it_IT";
import enUS from "antd/es/locale/en_US";
import * as moment from "moment";
import 'moment/locale/it';
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import BaseLayout from "./components/BaseLayout";

// Componente principale del app: definisce inoltre le rotte
export default function App(props) {
    // State del componente
    const [state, setState] = useState({
        locale: itIT,
        lang: 'it'
    });

    // Serve per settare una determinata lingua
    const changeLocale = (lang) => {
        const localeValue = lang === "it" ? itIT : enUS;
        moment.locale(lang);
        document.documentElement.lang = lang;
        setState({ locale: localeValue, lang });
    };

    // Dopo aver montato il componente, mette la lingua italiana
    useEffect(() => {
        changeLocale("it");
    }, [])

    return (
        <>
            <ConfigProvider locale={state.locale}>
                <IntlProvider locale={state.lang}>
                    <BaseLayout>
                        <Route exact path="/annullamento" component={Annulment} />
                        <Route exact path="/prenotazione" component={Reservation} />
                        <Route exact path="/" component={Home} />
                    </BaseLayout>
                </IntlProvider>
            </ConfigProvider>
        </>
    );
}