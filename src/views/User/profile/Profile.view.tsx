import { Card, Col, Divider, Row, Tabs } from "antd";
import { Container, useTitle } from "components";
import React from "react";
import { CredentialsForm, IndentityForm } from "./components";
import { AllCommunities, MyCommunities } from "./components/Communities";

type Props = {};

export const ProfileView = (props: Props) => {
    useTitle("Profile");
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <div style={{ marginBottom: "4rem" }}>
            <Container>
                <div
                    style={{
                        marginTop: "4rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1 style={{ marginBottom: 0 }} className="heading-2">
                        Profile
                    </h1>
                </div>
                <Divider />
                <div>
                    <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        style={{ marginBottom: "2rem" }}
                    >
                        <Col
                            xs={{ span: 24 }}
                            md={{ span: 24 }}
                            lg={{ span: 12 }}
                        >
                            <Card>
                                <h2 style={{ marginBottom: "2rem" }}>
                                    Votre identite
                                </h2>
                                <div>
                                    <IndentityForm />
                                </div>
                            </Card>
                        </Col>
                        <Col
                            xs={{ span: 24 }}
                            md={{ span: 24 }}
                            lg={{ span: 12 }}
                        >
                            <Card>
                                <h2 style={{ marginBottom: "2rem" }}>
                                    Vos identifiants
                                </h2>
                                <div>
                                    <CredentialsForm />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Divider />
                    <div>
                        <h2>Les communautes</h2>
                        <Tabs
                            defaultActiveKey="1"
                            onChange={onChange}
                            items={[
                                {
                                    label: `Les communautes`,
                                    key: "1",
                                    children: <AllCommunities />,
                                },
                                {
                                    label: `Mes communautes`,
                                    key: "2",
                                    children: <MyCommunities />,
                                },
                            ]}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};
