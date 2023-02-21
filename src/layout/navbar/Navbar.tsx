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
            label: "Islam",
            key: "islam",
            children: [
                {
                    label: <Link to={routes.islam}>Islam Soufi</Link>,
                    key: "islam-soufi",
                },
                {
                    label: <Link to={routes.figures}>Figures marquants</Link>,
                    key: "figures-marquants",
                },
            ],
        },
        {
            label: "Tijania",
            key: "tijania",
            children: [
                {
                    label: <Link to={routes.tariqas}>Les Tariqas</Link>,
                    key: "tariqas",
                },
                {
                    label: (
                        <Link to={routes.tijania}>
                            Tariqas Cheikh Ahmad-Tijani
                        </Link>
                    ),
                    key: "tijania",
                },
                {
                    label: (
                        <Link to={routes.objectif}>Objectifs de la voie</Link>
                    ),
                    key: "objectif",
                },
                {
                    label: (
                        <Link to={routes.moukhadams}>
                            Quelques grands Moukhadams
                        </Link>
                    ),
                    key: "Moukhadams",
                },
            ],
        },
        {
            label: "FaydaTijania",
            key: "faydaTijania",
            children: [
                {
                    label: (
                        <Link to={routes.histoire}>Histoire et Biographie</Link>
                    ),
                    key: "histoire",
                },
                {
                    label: (
                        <Link to={routes.definitions}>
                            Définitions des conceptes
                        </Link>
                    ),
                    key: "definitions",
                },
                {
                    label: (
                        <Link to={routes.moukhadamsBaye}>
                            Quelques grands Moukhadams de Baye
                        </Link>
                    ),
                    key: "moukhadams-baye",
                },
            ],
        },
        {
            label: "LiwaoulHamd",
            key: "liwaoulhamd",
            children: [
                {
                    label: (
                        <Link to={routes.parcours}>
                            Parcours du Cheikh Aziz
                        </Link>
                    ),
                    key: "parcours",
                },
                {
                    label: <Link to={routes.evenements}>Evénements</Link>,
                    key: "evenements",
                },
                {
                    label: <Link to={routes.activites}>Nos activités</Link>,
                    key: "activites",
                },
                {
                    label: (
                        <Link to={routes.publicationsCheikh}>
                            Publications du Cheikh
                        </Link>
                    ),
                    key: "publications-cheikh",
                },
                {
                    label: (
                        <Link to={routes.sections}>
                            Les différentes sections ou Kossi
                        </Link>
                    ),
                    key: "sections",
                },
            ],
        },
        {
            label: "Avis du Cheikh",
            key: "avis",
            children: [
                {
                    label: <Link to={routes.publications}>Publications</Link>,
                    key: "publications",
                },
                {
                    label: <Link to={routes.contributions}>Contributions</Link>,
                    key: "contributions",
                },
            ],
        },
        {
            label: "Enseignements",
            key: "enseignements",
            children: [
                {
                    label: (
                        <Link to={routes.poemes}>Poèmes et Ecrits de Baye</Link>
                    ),
                    key: "poemes",
                },
                {
                    label: <Link to={routes.institut}>L'institut</Link>,
                    key: "institut",
                },
                {
                    label: <Link to={routes.ecole}>Ecole coranique</Link>,
                    key: "ecole",
                },
            ],
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
                : path.pathname === "/tariqas-cheikh-ahmad-tijani"
                ? "tijania"
                : path.pathname === "/histoire"
                ? "histoire"
                : path.pathname === "/liwaoulhamd"
                ? "liwaoulhamd"
                : path.pathname === "/publications"
                ? "publications"
                : path.pathname === "/enseignements"
                ? "enseignements"
                : path.pathname === "/evenements"
                ? "evenements"
                : ""
        );
    }, [path]);

    const onClick: MenuProps["onClick"] = (e) => {
        // console.log("click ", e);
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
