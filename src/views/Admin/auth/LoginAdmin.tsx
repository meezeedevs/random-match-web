import React from "react";
import { Button, Card, Form, Typography } from "antd";
import { InputField } from "components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "config";
import { useStoreActions, useStoreState } from "hooks";

const { Text } = Typography;

type Props = {};

const StyledAuthPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7;
`;

export const LoginAdmin = (props: Props) => {
    const { loading } = useStoreState((state) => state.auth);
    const { login } = useStoreActions((actions) => actions.auth);

    const onFinish = (values: any) => {
        login(values);
    };

    return (
        <StyledAuthPage>
            <Card
                title="Login"
                style={{
                    width: 500,
                    boxShadow: "0rem 0.5rem 0.5rem rgba(0,0,0,.1)",
                }}
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    layout="vertical"
                    noValidate
                >
                    <InputField
                        name="email"
                        required={true}
                        message="Please input your email!"
                        placeholder="Enter your email"
                        type="email"
                    />

                    <InputField
                        name="password"
                        required={true}
                        message="Please input your Password!"
                        placeholder="Enter your password"
                        type="password"
                        isPassword={true}
                    />

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                    <div>
                        {/* <Link to={routes.forgotPassword}>Forgot Password</Link> */}
                    </div>
                </Form>
                <div style={{ textAlign: "right", marginTop: "1vw" }}>
                    <div style={{ marginBottom: "1rem" }}>
                        <Link
                            to={routes.forgot}
                            style={{
                                color: "#ffffff",
                                textDecoration: "underline",
                                fontWeight: "bold",
                            }}
                        >
                            <Text style={{ padding: "0.5vh 0" }}>
                                Forgot password?
                            </Text>
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={routes.signup}
                            style={{
                                color: "#ffffff",
                                textDecoration: "underline",
                                fontWeight: "bold",
                            }}
                        >
                            <Text style={{ padding: ".5vh 0" }}>
                                or Register
                            </Text>
                        </Link>
                    </div>
                </div>
            </Card>
        </StyledAuthPage>
    );
};
