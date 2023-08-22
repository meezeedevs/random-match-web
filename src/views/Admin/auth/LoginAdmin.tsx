import React, { useEffect } from "react";
import { Button, Card, Form, Typography } from "antd";
import { InputField } from "components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "config";
import { useStoreActions, useStoreState } from "hooks";
import { redirectTo, storage } from "utils";
import { useTitle } from "components/document-head";

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

    useTitle("Login");

    const onFinish = (values: any) => {
        login(values);
    };

    useEffect(() => {
        const user = storage.get("jwtToken");
        if (user) return redirectTo(routes.home);
    }, []);

    return (
        <StyledAuthPage>
            <Card
                title={<h1 className="heading-4">Se connecter</h1>}
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
                        name="userName"
                        required={true}
                        message="Veuillez entrer votre username!"
                        placeholder="Entrer votre username"
                        type="username"
                    />

                    <InputField
                        name="password"
                        required={true}
                        message="Veuillez entrer votre Password!"
                        placeholder="Entrez votre password"
                        type="password"
                        isPassword={true}
                    />

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Se connecter
                        </Button>
                    </Form.Item>
                    <div>
                        {/* <Link to={routes.forgotPassword}>Forgot Password</Link> */}
                    </div>
                </Form>
                {/* <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div>
                        <Link
                            to={routes.home}
                            style={{
                                color: "#00ba71",
                                textDecoration: "underline",
                                fontWeight: "bold",
                            }}
                        >
                            <Text style={{}}>Aller a la page d'accueil</Text>
                        </Link>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div>
                            <Link
                                to={routes.signup}
                                style={{
                                    color: "#00ba71",
                                    textDecoration: "underline",
                                    fontWeight: "bold",
                                }}
                            >
                                <Text style={{ padding: ".5vh 0" }}>
                                    Creer un compte
                                </Text>
                            </Link>
                        </div>
                    </div>
                </div> */}
            </Card>
        </StyledAuthPage>
    );
};
