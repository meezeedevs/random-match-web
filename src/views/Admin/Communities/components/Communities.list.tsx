import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import { Link } from "react-router-dom";
import { storage } from "utils";

type Props = {
    list?: string;
};

interface DataType {
    _id?: string;
    name: string;
}

export const CommunitiesList = ({ list }: Props) => {
    const [appCommunities, setAppCommunities] = useState([] as DataType[]);

    const { loading, communities, communitiesNotMember } = useStoreState(
        (state) => state.communities
    );
    const {
        getCommunities,
        deleteCommunity,
        getCommunitiesNotMember,
        joinCommunity,
    } = useStoreActions((actions) => actions.communities);

    useEffect(() => {
        if (list === "users") {
            const user = storage.get("currentUser");
            if (user && user.id) getCommunitiesNotMember(user.id);
        } else getCommunities();
    }, [getCommunitiesNotMember, getCommunities, list]);

    useEffect(() => {
        if (communitiesNotMember && list === "users") {
            const datas: any = [];
            communitiesNotMember?.map((com: any, i: any) => {
                if (com !== null) {
                    const data = {
                        key: com?._id,
                        ...com,
                    };
                    return datas.push(data);
                } else return null;
            });
            setAppCommunities(datas);
        } else if (communities) {
            const datas: any = [];
            communities?.map((com: any) => {
                const data = {
                    key: com?._id,
                    ...com,
                };
                return datas.push(data);
            });
            setAppCommunities(datas);
        }
        return;
    }, [communities, communitiesNotMember, list]);

    const columns: ColumnsType<DataType> = [
        {
            title: "Nom de la communaute",
            dataIndex: "name",
            key: "name",
            render: (text, record) =>
                list !== "users" ? (
                    <Link to={`/admin/communities/${record._id}`}>{text}</Link>
                ) : (
                    <span>{text}</span>
                ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {list === "users" ? (
                        <Tooltip title="Faire une demande d'adhesion">
                            <Button
                                type="primary"
                                onClick={() => {
                                    const user = storage.get("currentUser");
                                    joinCommunity({
                                        user: user?.id,
                                        community: record?._id,
                                    } as any);
                                }}
                            >
                                Joindre
                            </Button>
                        </Tooltip>
                    ) : (
                        <span
                            className="delete"
                            onClick={() =>
                                deleteCommunity(record?._id as string)
                            }
                        >
                            <DeleteOutlined />{" "}
                        </span>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={appCommunities}
            loading={loading}
        />
    );
};
