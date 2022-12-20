import { Divider } from "antd";
import React from "react";
import { EventsForm, EventsList } from "./components";

type Props = {};

export const EventsView = (props: Props) => {
    return (
        <div>
            <h1 style={{ fontSize: "25px" }}>Les evenements</h1>
            <Divider />
            <h3>Creation d'un evenement</h3>
            <div>
                <EventsForm />
            </div>
            <Divider />
            <h3>Liste des evenements</h3>

            <div>
                <EventsList />
            </div>
        </div>
    );
};
