import { Button, Dropdown, Menu, MenuProps, Space } from "antd";
import React, { useEffect, useState } from "react";

import { UserOutlined } from "@ant-design/icons";

import logo from "assets/images/liwoul-hamd-logo.png";
import { routes } from "config";
import { Link } from "react-router-dom";
import { isUserAuthenticated, storage } from "utils";
import { useStoreActions } from "hooks";

type Props = {};

export const Navbar = (props: Props) => {
    const [current, setCurrent] = useState("islam");

    const { logout } = useStoreActions((actions) => actions.auth);

    const [authenticated, setAuthenticated] = useState(false);

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
                <Link to={routes.signup}>
                    <Button
                        type="default"
                        className="text-primary border-primary"
                    >
                        s'enregistrer
                    </Button>
                </Link>
            ),
            key: "0",
        },
        {
            label: (
                <Link to={routes.login}>
                    <Button type="primary">se connecter</Button>
                </Link>
            ),
            key: "1",
        },
    ];

    useEffect(() => {
        const user = isUserAuthenticated();
        if (user) setAuthenticated(true);
        else setAuthenticated(false);
    }, []);

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
                {authenticated ? (
                    <Button
                        type="default"
                        className="text-primary border-primary"
                    >
                        logout
                    </Button>
                ) : (
                    <>
                        <Link to={routes.signup}>
                            <Button
                                type="default"
                                className="text-primary border-primary"
                            >
                                s'enregistrer
                            </Button>
                        </Link>
                        <Link to={routes.login}>
                            <Button type="primary">se connecter</Button>
                        </Link>
                    </>
                )}
            </div>
            <div className="display-desktop-none">
                <Dropdown
                    menu={
                        authenticated
                            ? {
                                  items: [
                                      {
                                          label: (
                                              <>
                                                  <Button
                                                      type="default"
                                                      className="text-primary border-primary"
                                                      onClick={() => logout()}
                                                  >
                                                      logout
                                                  </Button>
                                              </>
                                          ),
                                          key: "0",
                                      },
                                  ],
                              }
                            : { items }
                    }
                    trigger={["click"]}
                >
                    <Space>
                        <UserOutlined style={{ cursor: "pointer" }} />
                    </Space>
                </Dropdown>
            </div>
        </div>
    );
};
