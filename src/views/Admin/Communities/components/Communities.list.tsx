import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import { Link } from "react-router-dom";

type Props = {
    list?: string;
};

interface DataType {
    _id?: string;
    name: string;
}

export const CommunitiesList = ({ list }: Props) => {
    const [appCommunities, setAppCommunities] = useState([] as DataType[]);

    const { loading, communities } = useStoreState(
        (state) => state.communities
    );
    const { getCommunities, deleteCommunity } = useStoreActions(
        (actions) => actions.communities
    );

    useEffect(() => {
        getCommunities();
    }, [getCommunities]);

    useEffect(() => {
        if (communities) {
            const datas: any = [];
            communities?.map((com) => {
                const data = {
                    key: com._id,
                    ...com,
                };
                return datas.push(data);
            });
            setAppCommunities(datas);
        }
        return;
    }, [communities]);

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
                        <Tooltip title="Option bientot disponible.">
                            <Button type="primary" disabled>
                                Join
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
