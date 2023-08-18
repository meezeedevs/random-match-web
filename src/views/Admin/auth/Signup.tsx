import React, { useEffect } from "react";
import { Button, Card, Form, Typography } from "antd";
import { InputField, useTitle } from "components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "config";
import { useStoreActions, useStoreState } from "hooks";
import { redirectTo, storage } from "utils";

const { Text } = Typography;

type Props = {};

const StyledAuthPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7;
`;

export const SignupView = (props: Props) => {
    useTitle("S'enregistrer");
    const { loading } = useStoreState((state) => state.auth);
    const { signup } = useStoreActions((actions) => actions.auth);

    const onFinish = (values: any) => {
        console.log(values,'signup')
        signup(values);
    };

    useEffect(() => {
        const user = storage.get("jwtToken");
        if (user) return redirectTo(routes.home);
    }, []);

    return (
        <StyledAuthPage>
            <Card
                title={<h1 className="heading-4">S'enregistrer</h1>}
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
                        name="last_name"
                        required={true}
                        message="Veuillez entrer votre nom!"
                        placeholder="Entrez votre nom"
                        type="text"
                        label="Nom"
                    />
                    <InputField
                        name="first_name"
                        required={true}
                        message="Veuillez entrer votre prenom!"
                        placeholder="Entrez votre prenom"
                        type="text"
                        label="Prenom"
                    />

                    <InputField
                        name="email"
                        required={true}
                        message="Please input your email!"
                        placeholder="Enter your email"
                        type="email"
                        label="Email"
                    />

                    {/* <InputField
                        name="phone"
                        required={true}
                        message="Veuillez entrer votre numero de telephone!"
                        placeholder="Entrer votre numero de telephone"
                        type="number"
                        label="Numero de telephone"
                    />

                    <InputField
                        name="gender"
                        required={true}
                        message="Veuillez selectionnez votre genre"
                        placeholder="Selectionnez votre genre"
                        select
                        label="Genre"
                        options={[
                            {
                                value: "male",
                                label: "Homme",
                            },
                            {
                                value: "female",
                                label: "Femme",
                            },
                        ]}
                    /> */}

                    <InputField
                        name="password"
                        required={true}
                        hasFeedback
                        message="Please input your Password!"
                        placeholder="Enter your password"
                        type="password"
                        isPassword={true}
                        label="Mot de passe"
                    />
                    <InputField
                        name="password2"
                        isPassword2
                        required={true}
                        hasFeedback
                        message="Veuillez confirmer votre mot de passe!"
                        placeholder="Confirm mot de passe"
                        type="password"
                        label="Confirmation mot de passe"
                    />

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            S'enregistrer
                        </Button>
                    </Form.Item>
                </Form>
                <div
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
                            <Text style={{}}>Aller sur la page d'accueil</Text>
                        </Link>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        {/* <div style={{ marginBottom: "1rem" }}>
                            <Link
                                to={routes.forgot}
                                style={{
                                    color: "#00ba71",
                                    textDecoration: "underline",
                                    fontWeight: "bold",
                                }}
                            >
                                <Text style={{}}>Mot de passe oublier?</Text>
                            </Link>
                        </div> */}
                        <div>
                            <Link
                                to={routes.login}
                                style={{
                                    color: "#00ba71",
                                    textDecoration: "underline",
                                    fontWeight: "bold",
                                }}
                            >
                                <Text style={{ padding: ".5vh 0" }}>
                                    Retour au login
                                </Text>
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </StyledAuthPage>
    );
};
