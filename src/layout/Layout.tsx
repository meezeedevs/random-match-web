import React, { ReactNode, useEffect, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Space, theme } from "antd";
import { SiderContent } from "./sider";
import { useStoreActions } from "hooks";
import { useLocation } from "react-router-dom";
import { storage } from "utils";

const { Header, Sider, Content, Footer } = Layout;

type Props = {
    children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
    const { logout } = useStoreActions((actions) => actions.auth);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const location = useLocation();
    const [authPage, setAuthPage] = useState(true);
    const [adminLayout, setAdminLayout] = useState(true);

    useEffect(() => {
        if (
            location.pathname === "/" ||
            location.pathname === "/auth/login" ||
            location.pathname === "/auth/signup" ||
            location.pathname === "/auth/forgot-password" ||
            location.pathname === "/auth/reset-password"
        )
            setAuthPage(true);
        else {
            setAuthPage(false);
            setAdminLayout(true)
            // var regex: any = "admin";
            // var path = location.pathname;
            // if (path.indexOf(regex) > -1) setAdminLayout(true);
            // else {
            //     setAdminLayout(false);
            // }
        }
        return;
    }, [location]);

    const [currentUser, setCurrentUser] = useState({} as unknown as any);

    useEffect(() => {
        const user = storage.get("currentUser");
        if (user) setCurrentUser(user);
    }, []);

    return (
        <>
            {authPage ? (
                <div> {children}</div>
            ) : adminLayout ? (
                <Layout style={{ height: "100vh" }}>
                    <Sider trigger={null} width={250} collapsible collapsed={collapsed}>
                        <SiderContent collapsed={collapsed} />
                    </Sider>
                    <Layout className="site-layout">
                        <Header
                            style={{
                                padding: 0,
                                background: colorBgContainer,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {React.createElement(
                                collapsed
                                    ? MenuUnfoldOutlined
                                    : MenuFoldOutlined,
                                {
                                    className: "trigger",
                                    style: { marginLeft: "20px" },
                                    onClick: () => setCollapsed(!collapsed),
                                }
                            )}
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            label: (
                                                <span
                                                    style={{
                                                        marginRight: "20px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => logout()}
                                                    className="delete"
                                                >
                                                    <LogoutOutlined />{" "}
                                                    <span
                                                        style={{
                                                            marginLeft: "5px",
                                                        }}
                                                    >
                                                        Logout
                                                    </span>
                                                </span>
                                            ),
                                            key: "0",
                                        },
                                    ],
                                }}
                                trigger={["click"]}
                            >
                                <span
                                    style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        marginRight: "2rem",
                                    }}
                                >
                                    <Space
                                        style={{
                                            height: "40px",
                                            display: "flex",
                                            alignItems: "center",
                                            width: "40px",
                                            justifyContent: "center",
                                            background: "#ebebeb",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        <UserOutlined style={{}} />
                                    </Space>
                                    {currentUser ? (
                                        <span style={{ marginLeft: "5px" }}>
                                            {currentUser.lastName}
                                        </span>
                                    ) : null}
                                </span>
                            </Dropdown>
                        </Header>
                        <Content
                            style={{
                                margin: "24px 16px",
                                padding: 24,
                                minHeight: 280,
                                background: colorBgContainer,
                                height: "100vh",
                                overflowY: "auto",
                            }}
                        >
                            {children}
                        </Content>
                        <Footer>

                        </Footer>
                    </Layout>
                </Layout>
            ) : null
            }
        </>
    );
};
