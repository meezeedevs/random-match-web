import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import { CommunitiesSelect, InputField, UsersSelect } from "components";

type Props = {};

interface DataType {
    _id?: string;
    name: string;
}

export const CommunitiesList = (props: Props) => {
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
            communities.map((com) => {
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
            render: (text) => <a href="/">{text}</a>,
        },

        {
            title: "Assign users role",
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
                    <span
                        className="delete"
                        onClick={() => deleteCommunity(record?._id as string)}
                    >
                        <DeleteOutlined />{" "}
                    </span>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={appCommunities}
            size="small"
            loading={loading}
        />
    );
};

export const RenderContent = ({ el }: any) => {
    const [isRole, setIsRole] = useState(false);

    const { loading } = useStoreState((state) => state.auth);

    const { addRole } = useStoreActions((actions) => actions.users);

    const onFinish = (val: any) => {
        const data = {
            user: val.user,
            role: val.role,
            community: el._id,
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
                            <UsersSelect name="user" hasLabel={false} />
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <InputField
                                name="role"
                                required={true}
                                message="Please input the role!"
                                placeholder="Select a role"
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
