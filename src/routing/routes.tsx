import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import {
    CommunitiesView,
    CommunityDetailView,
    DashboardView,
    EventsView,
    HomeView,
    LoginAdmin,
    PostsView,
    PublicationsView,
    UsersView,
    SignupView,
    PublicationDetailsView,
    PublicEventsView,
    ProfileView,
    MenuIslam,
    MenuBayeNiass,
    MenuLiwaoulham,
    MenuEcritDeBaye,
} from "views";
// import { UserEditView } from "views/admin/dashboard";
import { routes, PrivateRoutes } from "config";
import { MaintenanceMessage } from "components";

export const getRoutes = () => (
    <Fragment>
        <Route path={routes.login} element={<LoginAdmin />} />
        <Route path={routes.signup} element={<SignupView />} />
        {/*<Route path={routes.forgot} element={<ForgotPasswordView />} />
        <Route path={routes.reset} element={<ResetPasswordView />} /> */}

        <Route path={routes.home} element={<HomeView />} />
        <Route path={routes.publications} element={<PublicationsView />} />
        <Route path={routes.publication} element={<PublicationDetailsView />} />
        <Route path={routes.evenements} element={<PublicEventsView />} />
        <Route path={routes.islam} element={<MenuIslam />} />
        <Route path={routes.tijania} element={<MenuBayeNiass />} />
        <Route path={routes.histoire} element={<MenuBayeNiass />} />
        <Route path={routes.liwaoulham} element={<MenuLiwaoulham />} />
        <Route path={routes.ecrits} element={<MenuEcritDeBaye />} />
        <Route
            path={routes.figures}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />
        <Route
            path={routes.tariqas}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />
        <Route
            path={routes.objectif}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />
        <Route
            path={routes.moukhadams}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />
        <Route
            path={routes.histoire}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route
            path={routes.definitions}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route
            path={routes.moukhadamsBaye}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route
            path={routes.parcours}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route
            path={routes.activites}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route
            path={routes.publicationsCheikh}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route
            path={routes.sections}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route
            path={routes.contributions}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route
            path={routes.poemes}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route
            path={routes.institut}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />
        <Route
            path={routes.ecole}
            element={<MaintenanceMessage text={"Comming soon"} />}
        />

        <Route path={routes.profile} element={<ProfileView />} />

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
