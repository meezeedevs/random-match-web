import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import {
    CommunitiesView,
    CommunityDetailView,
    DashboardView,
    EventsView,
    LoginAdmin,
    PostsView,
    UsersView,
} from "views";
// import { UserEditView } from "views/admin/dashboard";
import { routes, PrivateRoutes } from "config";

export const getRoutes = () => (
    <Fragment>
        <Route path={routes.login} element={<LoginAdmin />} />
        {/* <Route path={routes.signup} element={<SignUpView />} /> */}
        {/*<Route path={routes.forgot} element={<ForgotPasswordView />} />
        <Route path={routes.reset} element={<ResetPasswordView />} /> */}

        <Route
            path={routes.dashboard}
            element={
                <PrivateRoutes>
                    <DashboardView />
                </PrivateRoutes>
            }
        />
        <Route
            path={routes.dashboard}
            element={
                <PrivateRoutes>
                    <DashboardView />
                </PrivateRoutes>
            }
        />
        <Route
            path={routes.users}
            element={
                <PrivateRoutes>
                    <UsersView />
                </PrivateRoutes>
            }
        />
        <Route
            path={routes.communities}
            element={
                <PrivateRoutes>
                    <CommunitiesView />
                </PrivateRoutes>
            }
        />
        <Route
            path={routes.communityDetail}
            element={
                <PrivateRoutes>
                    <CommunityDetailView />
                </PrivateRoutes>
            }
        />
        <Route
            path={routes.posts}
            element={
                <PrivateRoutes>
                    <PostsView />
                </PrivateRoutes>
            }
        />
        <Route
            path={routes.events}
            element={
                <PrivateRoutes>
                    <EventsView />
                </PrivateRoutes>
            }
        />
        <Route
            path={routes.home}
            element={
                <PrivateRoutes>
                    <DashboardView />
                </PrivateRoutes>
            }
        />
    </Fragment>
);
