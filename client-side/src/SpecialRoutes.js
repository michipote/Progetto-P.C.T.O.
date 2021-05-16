
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ component: Component, all, level, ...rest }) {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('user') !== null ?
                (level.includes(JSON.parse(localStorage.getItem('user')).tipo)) ?
                    <Component {...props} />
                    : <Redirect to="/error403" />
                :
                all === undefined ?
                    <Redirect to="/error403" />
                    : <Component {...props} />
        )} />
    );
};

export function PublicRoute({ component: Component, restricted, ...rest }) {
    return (
        <Route {...rest} render={props => (
            (localStorage.getItem('user') !== null && restricted) ?
                <Redirect to="/error403" />
                : <Component {...props} />
        )} />
    );
};


