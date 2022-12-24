import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    Modal,
    Row,
    Space,
    Table,
    Tag,
    Tooltip,
    Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import { InputField } from "components";

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
    const { getUsers, deleteUser } = useStoreActions(
        (actions) => actions.users
    );

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
            render: (text, record) => (
                <>{text ? <EditPassword data={record} /> : "-"}</>
            ),
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <span
                        className="delete"
                        onClick={() => deleteUser(record._id as string)}
                    >
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

const EditPassword = (data: any) => {
    const record = data.data;
    console.log(data);
    const [edition, setEdition] = useState(false);
    const [toEdit, setToEdit] = useState(null as unknown as any);

    const { loadingRoles } = useStoreState((state) => state.users);
    const { updateUserPassword } = useStoreActions((actions) => actions.users);

    const onFinish = (val: any) => {
        const data = {
            user: toEdit,
            newPassword: val.password,
            newPassword2: val.password2,
        };
        console.log(data);
        updateUserPassword(data).then(() => setEdition(false));
    };

    return (
        <div key={record._id}>
            <>
                <div
                    onDoubleClick={() => {
                        setEdition(true);
                        setToEdit(record._id);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <Tooltip title="Double-clicker sur cet element si vous voulez mettre a jour le mot de passe">
                        <Tag className="copyable">
                            <Paragraph copyable>
                                {record.initialPassword}
                            </Paragraph>
                        </Tag>
                    </Tooltip>
                </div>
                <Modal title="Basic Modal" open={edition} footer={null}>
                    {/* <div>
                        <p>
                            Une fois le password mis a jour, il ne s'affichera
                            plus. Si vous l'oublier par erreur, il faudra le
                            re-changer
                        </p>
                    </div> */}
                    <Form
                        onFinish={onFinish}
                        noValidate
                        layout="vertical"
                        style={{ maxWidth: "500px", marginTop: "1rem" }}
                    >
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={24}>
                                <InputField
                                    name="password"
                                    required={true}
                                    message="Please input your Password!"
                                    placeholder="Enter your password"
                                    type="password"
                                    isPassword={true}
                                />
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={24}>
                                <InputField
                                    name="password2"
                                    isPassword2
                                    required={true}
                                    message="Please confirm Password!"
                                    placeholder="Confirm password"
                                    type="password"
                                    isPassword={true}
                                />
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={24}>
                                <div style={{ display: "flex" }}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loadingRoles}
                                        >
                                            Update
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
                </Modal>
            </>
        </div>
    );
};
