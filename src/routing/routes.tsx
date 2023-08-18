import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import {
    LoginAdmin,
    MembersView,
    SignupView,
    UserView,
} from "views";
// import { UserEditView } from "views/admin/dashboard";
import { routes, PrivateRoutes } from "config";
// import { MaintenanceMessage } from "components";

export const getRoutes = () => (
    <Fragment>
        <Route path={routes.login} element={<LoginAdmin />} />
        <Route path={routes.signup} element={<SignupView />} />
        {/*<Route path={routes.forgot} element={<ForgotPasswordView />} />
        <Route path={routes.reset} element={<ResetPasswordView />} /> */}

        <Route
            path={routes.members}
            element={
                <PrivateRoutes>
                    <MembersView />
                </PrivateRoutes>
            }
        />
        <Route
            path={routes.home}
            element={
                <PrivateRoutes>
                    <UserView />
                </PrivateRoutes>
            }
        />
    </Fragment>
);
