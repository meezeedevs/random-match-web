import React from "react";
import {
    UserOutlined,
    UsergroupAddOutlined,
    CopyOutlined,
    CalendarOutlined,
    AudioOutlined,
    DashboardOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "config";

import logo from "assets/images/liwoul-hamd-logo.png";

type Props = {
    collapsed: boolean;
};

const StyledContainer = styled.div`
    .ant-menu-item-selected,
    .ant-menu-item:not(.ant-menu-item-selected):active {
        background-color: #3baa6f !important;
    }
`;

export const SiderContent = ({ collapsed }: Props) => {
    return (
        <StyledContainer>
            <div
                style={{
                    width: "100%",
                    height: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1
                    style={{
                        background: "white",
                        color: "#000",
                        margin: "10px auto",
                        display: "flex",
                        alignItems: "center",
                        padding: "5px",
                        borderRadius: "5px",
                    }}
                >
                    <img src={logo} style={{ maxWidth: "25px" }} alt="" />
                    {collapsed ? (
                        ""
                    ) : (
                        <span style={{ marginLeft: "10px" }}>LiwaoulHamd</span>
                    )}
                </h1>
            </div>

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                    {
                        key: "1",
                        icon: <DashboardOutlined />,
                        label: <Link to={routes.dashboard}>Dashboard</Link>,
                    },
                    {
                        key: "2",
                        icon: <UserOutlined />,
                        label: <Link to={routes.users}>Utilisateurs</Link>,
                    },
                    {
                        key: "3",
                        icon: <UsergroupAddOutlined />,
                        label: <Link to={routes.communities}>Communautes</Link>,
                    },
                    {
                        key: "4",
                        icon: <CopyOutlined />,
                        label: <Link to={routes.posts}>Publications</Link>,
                    },
                    {
                        key: "5",
                        icon: <CalendarOutlined />,
                        label: <Link to={routes.events}>Evenements</Link>,
                    },
                    {
                        key: "6",
                        icon: <AudioOutlined />,
                        label: <Link to={routes.poems}>Poemes</Link>,
                    },
                ]}
            />
        </StyledContainer>
    );
};
