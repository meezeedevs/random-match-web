import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import { CommunitiesSelect, InputField } from "components";

type Props = {};

type RoleProps = {
    el: any;
    loading: boolean;
};

interface DataType {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    communities: Array<any>;
    handleColor?: string;
    isAdmin?: boolean;
    isInactive?: boolean;
}

export const UsersView = (props: Props) => {
    const { loading } = useStoreState((state) => state.auth);

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
                              let color = com.length > 5 ? "geekblue" : "green";
                              if (com === "loser") {
                                  color = "volcano";
                              }
                              return (
                                  <Tag color={color} key={com}>
                                      {com.toUpperCase()}
                                  </Tag>
                              );
                          })
                        : "-"}
                </>
            ),
        },
        {
            title: "Assign role in community",
            key: "role",
            render: (text, record) => (
                <RenderContent el={record} loading={loading} />
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
            <h1>Liste des utilisateurs</h1>
            <Table
                columns={columns}
                dataSource={appUsers}
                size="small"
                loading={loadingUsers}
            />
        </div>
    );
};

export const RenderContent = ({ el }: RoleProps) => {
    const [isRole, setIsRole] = useState(false);

    const { loading } = useStoreState((state) => state.auth);

    const { addRole } = useStoreActions((actions) => actions.users);

    const onFinish = (val: any) => {
        const data = {
            user: el._id,
            role: val.role,
            community: val.community,
        };
        console.log(data);
        addRole(data);
    };
    const RoleComponent = () => {
        return (
            <div className="table-inputs" key={el._id}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    layout="vertical"
                    noValidate
                >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={8}>
                            <CommunitiesSelect name="community" />
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <InputField
                                name="role"
                                required={true}
                                message="Please input the role!"
                                placeholder="Enter the role"
                                select
                                size="small"
                                options={[
                                    {
                                        value: "user",
                                        label: "User",
                                    },
                                    {
                                        value: "admin",
                                        label: "Admin",
                                    },
                                ]}
                            />
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div style={{ display: "flex" }}>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        size="small"
                                    >
                                        Assign
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="default"
                                        size="small"
                                        onClick={() => setIsRole(false)}
                                        style={{ marginLeft: "5px" }}
                                    >
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    };

    return (
        <div key={el._id}>
            {isRole ? (
                <RoleComponent key={el._id} />
            ) : (
                <span
                    className="sub-actions"
                    onClick={() => {
                        setIsRole(true);
                    }}
                >
                    <PlusOutlined /> assign role
                </span>
            )}
        </div>
    );
};
