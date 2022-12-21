import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import { InputField } from "components";
import { Link } from "react-router-dom";
import moment from "moment";

type Props = {
    com_id: string;
    setTitle: any;
};

interface DataType {
    _id?: string;
    user: any;
    role: string;
    createdAt: Date | any;
    community: any;
}

export const CommunityDetailList = ({ com_id, setTitle }: Props) => {
    const [appCommunityMembers, setAppCommunityMembers] = useState(
        [] as DataType[]
    );

    const { loadingMembers, communityMembers } = useStoreState(
        (state) => state.communities
    );
    const { users } = useStoreState((state) => state.users);

    const { getCommunityMembers, deleteCommunityMember } = useStoreActions(
        (actions) => actions.communities
    );

    useEffect(() => {
        setTitle(appCommunityMembers[0]?.community?.name);
    }, [appCommunityMembers]);

    useEffect(() => {
        getCommunityMembers(com_id as string);
    }, [getCommunityMembers, com_id, users]);

    useEffect(() => {
        if (communityMembers) {
            const datas: any = [];
            communityMembers.map((com) => {
                const data = {
                    key: com._id,
                    ...com,
                };
                return datas.push(data);
            });
            setAppCommunityMembers(datas);
        }
        return;
    }, [communityMembers]);

    const columns: ColumnsType<DataType> = [
        {
            title: "Nom de l'utilisateur",
            dataIndex: "user",
            key: "user",
            render: (text, record) => (
                <Link to={`#`}>
                    {record.user.firstName} {record.user.lastName}
                </Link>
            ),
        },
        {
            title: "Role",
            key: "role",
            width: 500,
            dataIndex: "role",
            render: (_, record) => <EditRole data={record} />,
        },
        {
            title: "Membre depuis",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => <>{moment(text).calendar()}</>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <span
                        className="delete"
                        onClick={() =>
                            deleteCommunityMember({
                                role: record?._id,
                                community: com_id,
                            } as any)
                        }
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
            dataSource={appCommunityMembers}
            loading={loadingMembers}
        />
    );
};

const EditRole = (data: any) => {
    const { role, user, _id } = data.data;
    console.log(data);
    const [edition, setEdition] = useState(false);
    const [toEdit, setToEdit] = useState(null as unknown as any);

    const { loadingRoles } = useStoreState((state) => state.users);
    const { updateRole } = useStoreActions((actions) => actions.users);

    const onFinish = (val: any) => {
        const data = {
            roleId: toEdit,
            role: val.role,
        };
        console.log(data);
        updateRole(data).then(() => setEdition(false));
    };

    return (
        <div key={user._id} className="table-inputs">
            {edition ? (
                <Form
                    onFinish={onFinish}
                    noValidate
                    style={{ maxWidth: "300px" }}
                >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={18}>
                            <InputField
                                name="role"
                                required={true}
                                message="Please input the role!"
                                placeholder="Select a role"
                                select
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
                        <Col className="gutter-row" span={6}>
                            <div style={{ display: "flex" }}>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loadingRoles}
                                    >
                                        Assign
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="default"
                                        onClick={() => setEdition(false)}
                                        style={{ marginLeft: "5px" }}
                                    >
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <Tag
                    color={role === "user" ? "green" : "orange"}
                    key={user._id}
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "fit-content",
                    }}
                    className="tag"
                >
                    <span>{role.toUpperCase()}</span>
                    <div className="tag-actions">
                        <EditOutlined
                            onClick={() => {
                                setEdition(true);
                                setToEdit(_id);
                            }}
                        />
                    </div>
                </Tag>
            )}
        </div>
    );
};
