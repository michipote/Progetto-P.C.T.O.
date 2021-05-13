import React, { useState, useEffect, useContext } from "react";
import { Route } from "react-router";
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
import Registration from "./components/Registration";
import Login from "./components/Login";
import { AppContext } from ".";
import ReservationsList from "./components/ReservationsList";
import Execution from "./components/Execution/Execution";
import InfectionMap from "./components/InfectionMap";
import Vaccines from "./components/Vaccines";
import {PublicRoute, PrivateRoute} from "./SpecialRoutes"

// Componente principale del app: definisce inoltre le rotte
export default function App(props) {
    // State del componente
    const [localstate, setState] = useState({
        locale: itIT,
        lang: 'it'
    });

    const { state, dispatch } = useContext(AppContext);

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
            <ConfigProvider locale={localstate.locale}>
                <IntlProvider locale={localstate.lang}>
                    <BaseLayout>
                        <PublicRoute exact path="/situazione_vaccini" restricted={false} component={Vaccines} />
                        <PublicRoute exact path="/mappa_contagio" restricted={false} component={InfectionMap} />
                        <Route exact path="/esegui_tampone" component={Execution} />
                        <PublicRoute exact path="/annullamento" restricted={false} component={Annulment} />
                        <PublicRoute exact path="/prenotazione" restricted={false} component={Reservation} />
                        <PublicRoute exact path="/registrazione" restricted={true} component={Registration} />
                        <PublicRoute exact path="/login" restricted={true} component={Login} />
                        <Route exact path="/lista_prenotazioni" component={ReservationsList} />
                        <PublicRoute exact path="/" restricted={false} component={Home} />
                    </BaseLayout>
                </IntlProvider>
            </ConfigProvider>
        </>
    );
}