import React from "react";
import {
    UserOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "config";

// import logo from "assets/images/liwoul-hamd-logo.png";

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
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginTop: '30px'
                }}
            >
                <Link to={routes.home}>
                    <h1
                        style={{
                            color: "white",
                            // margin: "10px",
                            display: "flex",
                            alignItems: "center",
                            // padding: "30px",
                            textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: 800
                        }}
                    >
                        {collapsed ? (
                            "ASMSA"
                        ) : (
                            <span style={{ marginLeft: "10px" }}>
                                Automated random Matcher
                            </span>
                        )}
                    </h1>
                </Link>
            </div>

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                    {
                        key: "1",
                        icon: <UserOutlined />,
                        label: <Link to={routes.members}>members</Link>,
                    },
                    // {
                    //     key: "2",
                    //     icon: <CopyOutlined />,
                    //     label: <Link to={routes.messages}>Messages</Link>,
                    // }
                ]}
            />
        </StyledContainer>
    );
};
