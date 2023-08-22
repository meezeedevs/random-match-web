import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useStoreActions, useStoreState } from "hooks";
import { MembersPayload } from "state/types";

const { Paragraph } = Typography;
// import { InputField } from "components";

// const { Paragraph } = Typography;

type Props = {};

export const MembersList = (props: Props) => {
    const [appMembers, setAppMembers] = useState([] as MembersPayload[]);

    const { loadingMembers, members } = useStoreState((state) => state.members);
    const { getMembers, deleteMember } = useStoreActions(
        (actions) => actions.members
    );

    useEffect(() => {
        getMembers();
    }, [getMembers]);

    useEffect(() => {
        if (members) {
            const datas: any = [];
            members.map((us: any) => {
                const data = {
                    key: us._id,
                    ...us,
                };
                return datas.push(data);
            });
            setAppMembers(datas);
        }
        return;
    }, [members]);

    const columns: ColumnsType<MembersPayload> = [
        {
            title: "Usename",
            dataIndex: "userName",
            key: "userName",
            render: (text, record) => <a href="/">{record.userName}</a>,
        },
        {
            title: "Initial password",
            dataIndex: "initialPassword",
            key: "initialPassword",
            render: (text) =>
                text ? <Paragraph style={{marginBottom: 0}} copyable>{text}</Paragraph> : "-",
        },
        {
            title: "Chosen by",
            dataIndex: "picked_by",
            key: "picked_by",
            render: (text, record) => (
                <div>
                    <span>{record?.pickedBy?.userName ? record?.pickedBy?.userName : "-"}</span>
                </div>
            ),
        },

        {
            title: "Has chosen?",
            dataIndex: "picked",
            key: "picked",
            render: (text, record) => 
                
                    record?.pick && Object.keys(record?.pick).length > 0 ? 
                    <Tag color="green">
                    <span>Yes</span>
                </Tag>
                : <Tag color="red">
                <span>Not yet</span>
            </Tag>
                
            ,
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {record?.isMatched || (record?.pick && Object.keys(record?.pick).length > 0) ? (
                        <span className="disabled">
                            <DeleteOutlined />{" "}
                        </span>
                    ) : (
                        <span
                            className="delete"
                            onClick={() => {
                                console.log(record);
                                deleteMember(record?._id as string);
                            }}
                        >
                            <DeleteOutlined />{" "}
                        </span>
                    )}
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={appMembers}
                loading={loadingMembers}
            />
        </div>
    );
};

// const EditPassword = (data: any) => {
//     const record = data.data;
//     const [edition, setEdition] = useState(false);
//     const [toEdit, setToEdit] = useState(null as unknown as any);

//     const { loadingMembers } = useStoreState((state) => state.Members);
//     const { updateMember } = useStoreActions((actions) => actions.Members);

//     const onFinish = (val: any) => {
//         const data = {
//             Member: toEdit,
//             newPassword: val.password,
//             newPassword2: val.password2,
//         };
//         updateMember(data).then(() => setEdition(false));
//     };

//     return (
//         <div key={record._id}>
//             <>
//                 <div
//                     onDoubleClick={() => {
//                         setEdition(true);
//                         setToEdit(record._id);
//                     }}
//                     style={{ cursor: "pointer" }}
//                 >
//                     <Tooltip title="Double-clicker sur cette case texte si vous voulez mettre a jour le mot de passe">
//                         <Tag className="copyable">
//                             <Paragraph copyable>
//                                 {record.initialPassword}
//                             </Paragraph>
//                         </Tag>
//                     </Tooltip>
//                 </div>
//                 <Modal title="Basic Modal" open={edition} footer={null}>
//                     {/* <div>
//                         <p>
//                             Une fois le password mis a jour, il ne s'affichera
//                             plus. Si vous l'oublier par erreur, il faudra le
//                             re-changer
//                         </p>
//                     </div> */}
//                     <Form
//                         onFinish={onFinish}
//                         noValidate
//                         layout="vertical"
//                         style={{ maxWidth: "500px", marginTop: "1rem" }}
//                     >
//                         <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//                             <Col className="gutter-row" span={24}>
//                                 <InputField
//                                     name="password"
//                                     required={true}
//                                     message="Please input your Password!"
//                                     placeholder="Enter your password"
//                                     type="password"
//                                     isPassword={true}
//                                 />
//                             </Col>
//                         </Row>
//                         <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//                             <Col className="gutter-row" span={24}>
//                                 <InputField
//                                     name="password2"
//                                     isPassword2
//                                     required={true}
//                                     message="Please confirm Password!"
//                                     placeholder="Confirm password"
//                                     type="password"
//                                     isPassword={true}
//                                 />
//                             </Col>
//                         </Row>
//                         <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//                             <Col className="gutter-row" span={24}>
//                                 <div style={{ display: "flex" }}>
//                                     <Form.Item>
//                                         <Button
//                                             type="primary"
//                                             htmlType="submit"
//                                             loading={loadingMembers}
//                                         >
//                                             Update
//                                         </Button>
//                                     </Form.Item>
//                                     <Form.Item>
//                                         <Button
//                                             type="default"
//                                             onClick={() => setEdition(false)}
//                                             style={{ marginLeft: "5px" }}
//                                         >
//                                             Cancel
//                                         </Button>
//                                     </Form.Item>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Modal>
//             </>
//         </div>
//     );
// };
