import { Divider, Tabs } from "antd";
import { useTitle } from "components";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/CapitalizeFirstLetter";
import {
    CommunityDetailForm,
    CommunityDetailList,
    CommunityRequests,
} from "./components";
// import { CommunitiesList, CommunityForm } from "./components";

type Props = {};

export const CommunityDetailView = (props: Props) => {
    const [title, setTitle] = useState("");
    const param = useParams();

    const onChange = (key: string) => {
        // console.log(key);
    };

    return (
        <div>
            <h1 style={{ fontSize: "25px", fontWeight: "700" }}>
                <>
                    {title ? capitalizeFirstLetter(title) : "Community details"}{" "}
                    {useTitle(
                        `${
                            title
                                ? capitalizeFirstLetter(title)
                                : "Community details"
                        }`
                    )}
                </>
            </h1>
            <Divider />
            <h3>Ajout de user dans la communaute</h3>
            <div>
                <CommunityDetailForm com_id={param?.id as string} />
            </div>
            <Divider />
            <Tabs
                defaultActiveKey="1"
                onChange={onChange}
                items={[
                    {
                        label: `Liste des membres`,
                        key: "1",
                        children: (
                            <>
                                <h3>Liste des membres de la communaute</h3>

                                <div>
                                    <CommunityDetailList
                                        setTitle={(val: string) =>
                                            setTitle(val)
                                        }
                                        com_id={param?.id as string}
                                    />
                                </div>
                            </>
                        ),
                    },
                    {
                        label: `Liste des demandes d'adhesion`,
                        key: "2",
                        children: (
                            <CommunityRequests com_id={param?.id as string} />
                        ),
                    },
                ]}
            />
        </div>
    );
};
