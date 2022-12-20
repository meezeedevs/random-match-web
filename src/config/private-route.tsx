import React from "react";
import { isUserAuthenticated } from "utils";
import { routes } from "config";
import { Navigate } from "react-router-dom";

const currentRoute = window.location.pathname;
const search = window.location.search;

interface IPrivatesRoutesProps {
    children: React.ReactNode;
}

export const PrivateRoutes: any = (props: IPrivatesRoutesProps) => {
    // const authStatus = isUserAuthenticated();

    // if (authStatus.tokenExpired) {
    //     return props.children;
    // }

    // if (authStatus.visitor) {
    //     if (currentRoute === routes.dashboard) {
    //         return (
    //             <>
    //                 <Navigate to={currentRoute} />
    //             </>
    //         );
    //         // } else if (currentRoute === routes.resetPassword && search !== '') {
    //         //     return <Navigate to={`${currentRoute}${search}`} />;
    //     } else
    //         return (
    //             <>
    //                 <Navigate to={routes.home} />
    //             </>
    //         );
    // }

    const authStatus = isUserAuthenticated();

    if (authStatus.tokenExpired) {
        return props.children;
    }

    if (authStatus.newUser) {
        if (
            currentRoute !== routes.login &&
            currentRoute !== routes.forgot &&
            currentRoute !== routes.reset
        ) {
            return <Navigate to={routes.login} />;
        } else if (currentRoute === routes.reset && search !== "") {
            return <Navigate to={`${currentRoute}${search}`} />;
        } else return <Navigate to={currentRoute} />;
    }

    return props.children;
};
