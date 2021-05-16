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
import { PublicRoute, PrivateRoute } from "./SpecialRoutes"
import Error403 from "./components/Error403";

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
            <ConfigProvider locale={localstate.Flocale}>
                <IntlProvider locale={localstate.lang}>
                    <BaseLayout>
                        <Route exact path="/error403" component={Error403} />
                        <Route exact path="/situazione_vaccini" component={Vaccines} />
                        <Route exact path="/mappa_contagio" component={InfectionMap} />
                        <PrivateRoute exact path="/esegui_tampone" level={['1']} component={Execution} />
                        <PrivateRoute exact path="/annullamento" level={['0']} all={true} component={Annulment} />
                        <PrivateRoute exact path="/prenotazione" level={['0']} all={true} component={Reservation} />
                        <PublicRoute exact path="/registrazione" restricted={true} component={Registration} />
                        <PublicRoute exact path="/login" restricted={true} component={Login} />
                        <PrivateRoute exact path="/lista_prenotazioni" level={['0', '1', '2']} component={ReservationsList} />
                        <Route exact path="/" component={Home} />
                    </BaseLayout>
                </IntlProvider>
            </ConfigProvider>
        </>
    );
}