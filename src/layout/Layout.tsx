import React, { ReactNode, useEffect, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Layout, theme } from "antd";
import { SiderContent } from "./sider";
import { useStoreActions } from "hooks";
import { useLocation } from "react-router-dom";
import { Container } from "components";
import { Navbar } from "./navbar";
import { FooterNav } from "./footer";

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
            location.pathname === "/auth/login" ||
            location.pathname === "/auth/signup" ||
            location.pathname === "/auth/forgot-password" ||
            location.pathname === "/auth/reset-password"
        )
            setAuthPage(true);
        else {
            setAuthPage(false);
            var regex: any = "admin";
            var path = location.pathname;
            if (path.indexOf(regex) > -1) setAdminLayout(true);
            else {
                setAdminLayout(false);
            }
        }
        return;
    }, [location]);

    return (
        <>
            {authPage ? (
                <div> {children}</div>
            ) : adminLayout ? (
                <Layout style={{ height: "100vh" }}>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
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
                            <span
                                style={{
                                    marginRight: "20px",
                                    cursor: "pointer",
                                }}
                                onClick={() => logout()}
                            >
                                <LogoutOutlined />{" "}
                                <span style={{ marginLeft: "5px" }}>
                                    Logout
                                </span>
                            </span>
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
                    </Layout>
                </Layout>
            ) : (
                <Layout className="site-layout">
                    <Header
                        style={{
                            background: colorBgContainer,
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                            borderBottom: "2px solid #edf2f7",

                            position: "sticky",
                            top: 0,
                            zIndex: 5,
                            width: "100%",
                        }}
                    >
                        <Container>
                            <Navbar />
                        </Container>
                    </Header>
                    <Content
                        style={{
                            // margin: "24px 16px",
                            // padding: 24,
                            // minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </Content>
                    <Footer className="nav-footer">
                        <FooterNav />
                    </Footer>
                </Layout>
            )}
        </>
    );
};
