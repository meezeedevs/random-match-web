import React, { useEffect, useState } from "react";
import { Alert, Button, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { CheckOutlined, LogoutOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import { storage } from "utils";

type Props = {
    com_id: string;
};

export const CommunityRequests = ({ com_id }: Props) => {
    const [appCommunities, setAppCommunities] = useState([] as any);

    const { loading, communityRequests } = useStoreState(
        (state) => state.communities
    );
    const {
        getCommunityRequests,
        validateCommunityRequest,
        cancelUserRequest,
    } = useStoreActions((actions) => actions.communities);

    useEffect(() => {
        if (com_id) getCommunityRequests(com_id);
    }, [getCommunityRequests, com_id]);

    useEffect(() => {
        if (communityRequests && communityRequests.length > 0) {
            const datas: any = [];
            communityRequests?.map((com) => {
                const data = {
                    key: com._id,
                    ...com,
                };
                return datas.push(data);
            });
            setAppCommunities(datas);
        } else setAppCommunities([]);
        return;
    }, [communityRequests]);

    const columns: ColumnsType<any> = [
        {
            title: "Nom de l'utilisateur",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <span>
                    {record.user?.firstName} {record.user?.lastName}
                </span>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Valider la demande d'adhesion.">
                        <Button
                            type="primary"
                            onClick={() => {
                                validateCommunityRequest({
                                    id: record?._id,
                                    com: com_id,
                                } as any);
                            }}
                        >
                            <CheckOutlined /> Valider
                        </Button>
                    </Tooltip>
                    <Tooltip title="Option pour bientot">
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
                            disabled
                        >
                            <LogoutOutlined /> Refuser
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
