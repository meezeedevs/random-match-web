import { Divider } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { CommunityDetailForm, CommunityDetailList } from "./components";
// import { CommunitiesList, CommunityForm } from "./components";

type Props = {};

export const CommunityDetailView = (props: Props) => {
    const param = useParams();
    return (
        <div>
            <h1 style={{ fontSize: "25px" }}>Commuty detail</h1>
            <Divider />
            <h3>Ajout de user dans la communaute</h3>
            <div>
                <CommunityDetailForm com_id={param?.id as string} />
            </div>
            <Divider />
            <h3>Liste des communautes</h3>

            <div>
                <CommunityDetailList com_id={param?.id as string} />
            </div>
        </div>
    );
};
