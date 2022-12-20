import { Button, Col, Form, Row } from "antd";
import { InputField } from "components";
import { useStoreActions, useStoreState } from "hooks";
import React from "react";

type Props = {};

export const CommunityForm = (props: Props) => {
    const { loading } = useStoreState((state) => state.communities);
    const { registerCommunity } = useStoreActions(
        (actions) => actions.communities
    );

    const onFinish = (values: any) => {
        registerCommunity(values);
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
                            name="name"
                            required={true}
                            message="Please input your name!"
                            placeholder="Enter your name"
                            type="text"
                            label="Name"
                        />
                    </Col>

                    <Col className="gutter-row" span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
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
