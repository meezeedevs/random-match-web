import { Button, Col, Form, Row } from "antd";
import { InputField } from "components";
import { useStoreActions, useStoreState } from "hooks";

type Props = {};

export const MemberForm = (props: Props) => {
    const { loadingMembers } = useStoreState((state) => state.members);
    const { registerMember } = useStoreActions((actions) => actions.members);

    const onFinish = (values: any) => {
        console.log("Received values of form: ", values);
        registerMember(values);
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
                    <Col className="gutter-row" span={24}>
                        <InputField
                            name="userName"
                            required={true}
                            message="Please input full name"
                            placeholder="Enter full name"
                            type="text"
                            label="Full name"
                        />
                    </Col>

                    <Col className="gutter-row" span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loadingMembers}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
