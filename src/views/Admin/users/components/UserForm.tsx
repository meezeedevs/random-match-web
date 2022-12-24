import { Button, Col, Form, Row } from "antd";
import { InputField } from "components";
import { useStoreActions, useStoreState } from "hooks";

type Props = {};

export const UserForm = (props: Props) => {
    const { loadingUsers } = useStoreState((state) => state.users);
    const { registerUser } = useStoreActions((actions) => actions.users);

    const onFinish = (values: any) => {
        console.log("Received values of form: ", values);
        registerUser(values);
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
                    <Col className="gutter-row" span={8}>
                        <InputField
                            name="lastName"
                            required={true}
                            message="Please input your Nom!"
                            placeholder="Enter your Nom"
                            type="text"
                            label="Nom"
                        />
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <InputField
                            name="firstName"
                            required={true}
                            message="Please input your prenom!"
                            placeholder="Enter your prenom"
                            type="text"
                            label="Prenom"
                        />
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <InputField
                            name="email"
                            required={true}
                            message="Please input your email!"
                            placeholder="Enter your email"
                            type="text"
                            label="email"
                        />
                    </Col>

                    <Col className="gutter-row" span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loadingUsers}
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
