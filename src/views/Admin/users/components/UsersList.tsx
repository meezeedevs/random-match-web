import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";

const { Paragraph } = Typography;

type Props = {};

interface DataType {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    communities: Array<any>;
    handleColor?: string;
    isAdmin?: boolean;
    isInactive?: boolean;
    initialPassword?: string;
}

export const UsersList = (props: Props) => {
    const [appUsers, setAppUsers] = useState([] as DataType[]);

    const { loadingUsers, users } = useStoreState((state) => state.users);
    const { getUsers } = useStoreActions((actions) => actions.users);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (users) {
            const datas: any = [];
            users.map((us) => {
                const data = {
                    key: us._id,
                    ...us,
                };
                return datas.push(data);
            });
            setAppUsers(datas);
        }
        return;
    }, [users]);

    const columns: ColumnsType<DataType> = [
        {
            title: "Nom d'utilisateur",
            dataIndex: "username",
            key: "username",
            render: (text, record) => (
                <a href="/">
                    {record.firstName} {record.lastName}
                </a>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Communautes",
            key: "communities",
            dataIndex: "communities",
            render: (_, { communities }) => (
                <>
                    {communities.length > 0
                        ? communities.map((com) => {
                              let color: string;
                              if (com.role === "user") {
                                  color = "green";
                              } else color = "orange";
                              return (
                                  <Tag color={color} key={com}>
                                      {com.name.toUpperCase()}
                                  </Tag>
                              );
                          })
                        : "-"}
                </>
            ),
        },
        {
            title: "Initial Password",
            dataIndex: "initialPassword",
            key: "initialPassword",
            render: (text) => (
                <>
                    {text ? (
                        <Tag className="copyable">
                            <Paragraph copyable>{text}</Paragraph>
                        </Tag>
                    ) : (
                        "-"
                    )}
                </>
            ),
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <span className="delete">
                        <DeleteOutlined />{" "}
                    </span>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={appUsers}
                loading={loadingUsers}
            />
        </div>
    );
};
