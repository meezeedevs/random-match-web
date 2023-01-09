import React, { useEffect, useState } from "react";
import { Alert, Button, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { LogoutOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import { storage } from "utils";

// type Props = {
// };

export const MyRequests = () => {
    const [appCommunities, setAppCommunities] = useState([] as any);

    const { loading, userRequests } = useStoreState(
        (state) => state.communities
    );
    const { getUserRequests, cancelUserRequest } = useStoreActions(
        (actions) => actions.communities
    );

    useEffect(() => {
        const user = storage.get("currentUser");
        if (user && user.id) getUserRequests(user.id);
    }, [getUserRequests]);

    useEffect(() => {
        if (userRequests && userRequests.length > 0) {
            const datas: any = [];
            userRequests?.map((com) => {
                const data = {
                    key: com._id,
                    ...com,
                };
                return datas.push(data);
            });
            setAppCommunities(datas);
        }
        return;
    }, [userRequests]);

    const columns: ColumnsType<any> = [
        {
            title: "Nom de la communaute",
            dataIndex: "name",
            key: "name",
            render: (text, record) => <span>{record.community?.name}</span>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Annuler la demande.">
                        <Button
                            className="delete"
                            type="default"
                            onClick={() => {
                                const user = storage.get("currentUser");
                                cancelUserRequest({
                                    id: record?._id,
                                    user: user?.id,
                                } as any);
                            }}
                        >
                            <LogoutOutlined /> Annuler
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            {appCommunities && appCommunities.length <= 0 ? (
                <Alert
                    message="Message"
                    description={<span>Pas de d'adhesion en attente</span>}
                    type="info"
                    showIcon
                    closable
                />
            ) : null}
            <Table
                columns={columns}
                dataSource={appCommunities}
                loading={loading}
            />
        </>
    );
};
