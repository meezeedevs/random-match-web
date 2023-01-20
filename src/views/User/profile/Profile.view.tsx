import { Card, Col, Divider, Row, Spin, Tabs } from "antd";
import { Container, useTitle } from "components";
import React, { useState } from "react";
import { storage } from "utils";
import { CredentialsForm, IndentityForm } from "./components";
import {
    AllCommunities,
    MyCommunities,
    MyRequests,
} from "./components/Communities";

type Props = {};

export const ProfileView = (props: Props) => {
    const [reload, setReload] = useState(false);
    const [key, setKey] = useState("1");
    useTitle("Profile");
    const onChange = (key: string) => {
        console.log(key);
        setKey(key);
        setReload(true);
        setTimeout(() => setReload(false), 500);
    };

    const user = storage.get("currentUser");
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
                        Profile{" "}
                        {user ? (
                            <>
                                {" "}
                                - {user.firstName} {user.lastName}
                            </>
                        ) : null}
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
                            activeKey={key}
                            items={[
                                {
                                    label: `Les communautes`,
                                    key: "1",
                                    children:
                                        reload && key === "1" ? (
                                            <Spin spinning>
                                                <AllCommunities />
                                            </Spin>
                                        ) : (
                                            <AllCommunities />
                                        ),
                                },
                                {
                                    label: `Mes communautes`,
                                    key: "2",
                                    children:
                                        reload && key === "2" ? (
                                            <Spin spinning>
                                                <MyCommunities />
                                            </Spin>
                                        ) : (
                                            <MyCommunities />
                                        ),
                                },
                                {
                                    label: `Mes demandes`,
                                    key: "3",
                                    children:
                                        reload && key === "3" ? (
                                            <Spin spinning>
                                                <MyRequests />
                                            </Spin>
                                        ) : (
                                            <MyRequests />
                                        ),
                                },
                            ]}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};
