import { useTitle } from "components";
import { AppLayout } from "layout";
import React from "react";

type Props = {};

export const DashboardView = (props: Props) => {
    useTitle("Dashboard(admin)");
    return <h1 className="heading-2">In Development...</h1>;
};
