import React from 'react';
import { Route } from "react-router-dom";


function AuthRoute({component}) {

    return (
        <Route
            exact
            {...rest}
            render={(props) => {
                const isAuthenticated = userIsAuthenticated();
                const redirect = (
                    <Redirect
                        to={{
                            pathname: routes.login,
                            state: { from: props.location },
                        }}
                    />
                );

                if (!isAuthenticated) return redirect;
                if (!checkPermissions(permissions, permissionsList))
                    return <NoPermission />;
                return <Component {...props} />;
            }}
        />
    );

}
