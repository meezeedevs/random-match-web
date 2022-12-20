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

const { Header, Sider, Content } = Layout;

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

    useEffect(() => {
        if (location.pathname === "/auth/login") setAuthPage(true);
        else setAuthPage(false);
        return;
    }, [location]);

    return (
        <>
            {authPage ? (
                <div> {children}</div>
            ) : (
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
            )}
        </>
    );
};
