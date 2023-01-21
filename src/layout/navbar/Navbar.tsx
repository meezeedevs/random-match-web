import { Button, Dropdown, Menu, MenuProps, Space } from "antd";
import React, { useEffect, useState } from "react";

import { UserOutlined, LogoutOutlined, RobotOutlined } from "@ant-design/icons";

import logo from "assets/images/liwoul-hamd-logo.png";
import { routes } from "config";
import { Link, useLocation } from "react-router-dom";
import { storage } from "utils";
import { useStoreActions } from "hooks";

type Props = {};

export const Navbar = (props: Props) => {
    const [current, setCurrent] = useState("islam");
    const [currentUser, setCurrentUser] = useState({} as unknown as any);

    const { logout } = useStoreActions((actions) => actions.auth);

    const [authenticated, setAuthenticated] = useState(false);

    const navItems: MenuProps["items"] = [
        {
            label: <Link to={routes.islam}>ISLAM</Link>,
            key: "islam",
        },
        {
            label: <Link to={routes.baye}>BAYE NIASS</Link>,
            key: "baye",
        },
        {
            label: <Link to={routes.liwaoulham}>LIWAOULHAM</Link>,
            key: "liwaoulham",
        },
        {
            label: <Link to={routes.publications}>Publications</Link>,
            key: "publications",
        },
        {
            label: <Link to={routes.ecrits}>Ecrits de Baye</Link>,
            key: "ecrits",
        },
        {
            label: <Link to={routes.evenements}>Evenements</Link>,
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

    const path = useLocation();

    useEffect(() => {
        const token = storage.get("jwtToken");
        if (token) setAuthenticated(true);
        else setAuthenticated(false);
        const user = storage.get("currentUser");
        if (user) setCurrentUser(user);
    }, []);

    useEffect(() => {
        setCurrent(
            path.pathname === "/islam"
                ? "islam"
                : path.pathname === "/baye-niass"
                ? "baye"
                : path.pathname === "/liwaoulham"
                ? "liwaoulham"
                : path.pathname === "/publications"
                ? "publications"
                : path.pathname === "/ecrits-de-baye"
                ? "ecrits"
                : path.pathname === "/evenements"
                ? "evenements"
                : ""
        );
    }, [path]);

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
                width: "80vw",
            }}
        >
            <Link to={routes.home} className="logo">
                <img src={logo} style={{ maxWidth: "50px" }} alt="" />
            </Link>
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
                    justifyContent: `${
                        authenticated ? "center" : "space-between"
                    }`,
                    width: "22%",
                }}
                className="display-mobile-none"
            >
                {authenticated ? (
                    <Dropdown
                        menu={
                            authenticated
                                ? {
                                      items: [
                                          currentUser && currentUser.isAdmin
                                              ? {
                                                    label: (
                                                        <Link
                                                            to={
                                                                routes.dashboard
                                                            }
                                                        >
                                                            <RobotOutlined />{" "}
                                                            <span
                                                                style={{
                                                                    marginLeft:
                                                                        "5px",
                                                                }}
                                                            >
                                                                Admin dashboard
                                                            </span>
                                                        </Link>
                                                    ),
                                                    key: "dashboard",
                                                }
                                              : null,
                                          {
                                              label: (
                                                  <Link to={routes.profile}>
                                                      <UserOutlined />{" "}
                                                      <span
                                                          style={{
                                                              marginLeft: "5px",
                                                          }}
                                                      >
                                                          Profile
                                                      </span>
                                                  </Link>
                                              ),
                                              key: "profile",
                                          },

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
                                  }
                                : { items }
                        }
                        trigger={["click"]}
                    >
                        <span
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
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
