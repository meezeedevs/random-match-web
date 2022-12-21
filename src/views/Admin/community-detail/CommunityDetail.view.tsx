import { Divider } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/CapitalizeFirstLetter";
import { CommunityDetailForm, CommunityDetailList } from "./components";
// import { CommunitiesList, CommunityForm } from "./components";

type Props = {};

export const CommunityDetailView = (props: Props) => {
    const [title, setTitle] = useState("");
    const param = useParams();
    return (
        <div>
            <h1 style={{ fontSize: "25px", fontWeight: "700" }}>
                {title ? capitalizeFirstLetter(title) : "Community details"}{" "}
            </h1>
            <Divider />
            <h3>Ajout de user dans la communaute</h3>
            <div>
                <CommunityDetailForm com_id={param?.id as string} />
            </div>
            <Divider />
            <h3>Liste des communautes</h3>

            <div>
                <CommunityDetailList
                    setTitle={(val: string) => setTitle(val)}
                    com_id={param?.id as string}
                />
            </div>
        </div>
    );
};
