import { Divider } from "antd";
import React from "react";
import { CommunitiesList, CommunityForm } from "./components";

type Props = {};

export const CommunitiesView = (props: Props) => {
    return (
        <div>
            <h1 style={{ fontSize: "25px" }}>Les communautes</h1>
            <Divider />
            <h3>Creation de communautes</h3>
            <div>
                <CommunityForm />
            </div>
            <Divider />
            <h3>Liste des communautes</h3>

            <div>
                <CommunitiesList />
            </div>
        </div>
    );
};
