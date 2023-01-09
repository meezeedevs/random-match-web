import { Button, Col, Form, Row } from "antd";
import { InputField, UsersSelect } from "components";
import { useStoreActions, useStoreState } from "hooks";

type Props = {
    com_id: string;
};

export const CommunityDetailForm = ({ com_id }: Props) => {
    // const { loadingMembers } = useStoreState((state) => state.communities);

    const { loadingRoles } = useStoreState((state) => state.users);

    const { addRole } = useStoreActions((actions) => actions.users);

    const onFinish = (val: any) => {
        const data = {
            user: val.user,
            role: val.role,
            community: com_id,
        };
        // console.log(data);
        addRole(data);
    };
    return (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                layout="vertical"
                noValidate
            >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={12}>
                        <UsersSelect name="user" />
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <InputField
                            label="role"
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
                    <Col className="gutter-row" span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loadingRoles}
                            >
                                Assign
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
