import React from 'react';
import {Route, Switch} from 'react-router-dom'


function renderRoutes(routes) {
    return routes ? (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    exact={route.exact}
                    key={route.key || index}
                    path={route.path}
                    strict={route.strict}
                    render={(props) => {
                        return (
                            <route.component {...props} route={route}/>

                        );
                    }}
                />
            ))}
        </Switch>
    ) : null;
}

export default renderRoutes;
