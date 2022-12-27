import { Button, Dropdown, Menu, MenuProps, Space } from "antd";
import React, { useState } from "react";

import { UserOutlined } from "@ant-design/icons";

import logo from "assets/images/liwoul-hamd-logo.png";

type Props = {};

export const Navbar = (props: Props) => {
    const [current, setCurrent] = useState("islam");

    const navItems: MenuProps["items"] = [
        {
            label: "ISLAM",
            key: "islam",
        },
        {
            label: "BAYE NIASS",
            key: "niass",
        },
        {
            label: "LIWAOULHAM",
            key: "liwaoulham",
        },
        {
            label: "Publications",
            key: "publications",
        },
        {
            label: "Ecrits de Baye",
            key: "ecrits",
        },
        {
            label: "Evenements",
            key: "evenements",
        },
    ];

    const items: MenuProps["items"] = [
        {
            label: (
                <Button className="custom-button border-primary">
                    s'enregistrer
                </Button>
            ),
            key: "0",
        },
        {
            label: (
                <Button type="primary" size="large">
                    se connecter
                </Button>
            ),
            key: "1",
        },
    ];

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div className="logo">
                <img src={logo} style={{ maxWidth: "50px" }} alt="" />
            </div>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                defaultActiveFirst
                mode="horizontal"
                items={navItems}
                style={{
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: 700,
                    width: "70%",
                }}
            />
            <div
                style={{
                    // display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "22%",
                }}
                className="display-mobile-none"
            >
                <Button type="default" className="text-primary border-primary">
                    s'enregistrer
                </Button>
                <Button type="primary">se connecter</Button>
            </div>
            <div className="display-desktop-none">
                <Dropdown menu={{ items }} trigger={["click"]}>
                    <Space>
                        <UserOutlined style={{ cursor: "pointer" }} />
                    </Space>
                </Dropdown>
            </div>
        </div>
    );
};
