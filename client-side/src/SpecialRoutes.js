
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => (
            JSON.parse(localStorage.getItem('user'))?.isAuthenticated ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export function PublicRoute({ component: Component, restricted, ...rest }) {
    return (
        <Route {...rest} render={props => (
            (JSON.parse(localStorage.getItem('user'))?.isAuthenticated && restricted) ?
                <Redirect to="/" />
                : <Component {...props} />
        )} />
    );
};


