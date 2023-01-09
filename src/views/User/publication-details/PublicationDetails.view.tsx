import { useStoreActions, useStoreState } from "hooks";
import { Link, useLocation } from "react-router-dom";

import {
    LeftOutlined,
    HeartOutlined,
    MessageOutlined,
} from "@ant-design/icons";

import post_img from "assets/images/posts-img.webp";
import { Container, useTitle } from "components";
import { Col, Row, Spin } from "antd";
import { routes } from "config";
import parse from "html-react-parser";
import { Posts, VideoPosts } from "../home/components";
import { useEffect, useState } from "react";

type Props = {};

export const PublicationDetailsView = (props: Props) => {
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");

    const [postDetails, setPostDetails] = useState([] as any);

    const { loadingPosts, post } = useStoreState((state) => state.posts);

    const { getPostById, setPost } = useStoreActions(
        (actions) => actions.posts
    );

    useEffect(() => {
        getPostById(id as string);
    }, [getPostById, id]);

    useEffect(() => {
        setPostDetails(post);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [post]);

    const youtubeIframe = (videoLink: any) => {
        var regex: any = "youtube";
        var link = videoLink;
        if (link.indexOf(regex) > -1)
            return (
                <div className="css-1x060qm" style={{ width: "100%" }}>
                    <iframe
                        width="100%"
                        height="300px"
                        src={postDetails?.video}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        style={{ borderRadius: "22px" }}
                    />
                </div>
            );
        else return null;
    };

    return (
        <>
            <Container>
                <Spin spinning={loadingPosts} tip="chargement...">
                    <div>
                        <Link
                            to={routes.publications}
                            style={{ color: "#00ba71" }}
                            onClick={() => setPost({} as any)}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    // marginBottom: "2.5rem",
                                    cursor: "pointer",
                                    position: "sticky",
                                    top: "6vh",
                                    background: "#fff",
                                    padding: "3rem 0 3rem 0",
                                    width: "100%",
                                    zIndex: 1,
                                    alignItems: "center",
                                }}
                            >
                                <LeftOutlined />
                                <span style={{ marginLeft: "5px" }}>
                                    Retour
                                </span>
                            </div>
                        </Link>
                        <div
                            className="post-detail-content"
                            style={{ minHeight: "500px" }}
                        >
                            <Row
                                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                                style={{ marginBottom: "2rem" }}
                            >
                                <Col
                                    xs={{ span: 24 }}
                                    md={{ span: 24 }}
                                    lg={{ span: postDetails?.image ? 14 : 24 }}
                                >
                                    <div>
                                        <h1 className="heading-1">
                                            {postDetails?.title}
                                            {useTitle(`${postDetails?.title}`)}
                                        </h1>
                                        <p className="chakra-text css-4v9y6b">
                                            {postDetails?.content
                                                ? parse(postDetails?.content)
                                                : null}
                                        </p>
                                        <div>
                                            {postDetails?.video &&
                                            !postDetails?.image ? (
                                                <>
                                                    <div
                                                        style={{
                                                            marginTop: "2rem",
                                                        }}
                                                    >
                                                        Contenu video
                                                        disponible:{" "}
                                                        <a
                                                            target="_blank"
                                                            href={
                                                                postDetails?.video
                                                            }
                                                            rel="noreferrer"
                                                            style={{
                                                                color: "#00ba71",
                                                            }}
                                                        >
                                                            {postDetails?.video}
                                                        </a>
                                                    </div>
                                                    {youtubeIframe(
                                                        postDetails?.video
                                                    )}
                                                </>
                                            ) : null}
                                        </div>
                                        {loadingPosts ? null : (
                                            <>
                                                {" "}
                                                <hr />
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        width: "180px",
                                                        justifyContent:
                                                            "space-between",
                                                        margin: "20px 0 0 0",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            padding: "2px 15px",
                                                            backgroundColor:
                                                                "#F3F4F6",
                                                            borderRadius:
                                                                "15px",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <MessageOutlined />
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "14px",
                                                                fontWeight: 500,
                                                                marginLeft:
                                                                    "5px",
                                                            }}
                                                        >
                                                            10
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            padding: "2px 15px",
                                                            backgroundColor:
                                                                "#F3F4F6",
                                                            borderRadius:
                                                                "15px",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <HeartOutlined />
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "14px",
                                                                fontWeight: 500,
                                                                marginLeft:
                                                                    "5px",
                                                            }}
                                                        >
                                                            57
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Col>
                                {postDetails?.image ? (
                                    <Col
                                        xs={{ span: 24 }}
                                        md={{ span: 24 }}
                                        lg={{ span: 10 }}
                                    >
                                        {loadingPosts ? null : (
                                            <div>
                                                <img
                                                    alt="La naissance de l'islam partout dans le monde"
                                                    src={
                                                        postDetails?.image
                                                            ? postDetails?.image
                                                            : post_img
                                                    }
                                                    loading="lazy"
                                                    className="chakra-image css-13s8ik"
                                                    style={{ maxWidth: "100%" }}
                                                />

                                                {postDetails?.video ? (
                                                    <>
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    "2rem",
                                                            }}
                                                        >
                                                            Contenu video
                                                            disponible:{" "}
                                                            <a
                                                                target="_blank"
                                                                href={
                                                                    postDetails?.video
                                                                }
                                                                rel="noreferrer"
                                                                style={{
                                                                    color: "#00ba71",
                                                                }}
                                                            >
                                                                {
                                                                    postDetails?.video
                                                                }
                                                            </a>
                                                        </div>
                                                        {youtubeIframe(
                                                            postDetails?.video
                                                        )}
                                                    </>
                                                ) : null}
                                            </div>
                                        )}
                                    </Col>
                                ) : null}
                            </Row>
                        </div>
                    </div>
                </Spin>
            </Container>
            <div style={{ background: "#F3F4F6" }}>
                <Container>
                    <Posts />
                    <VideoPosts />
                </Container>
            </div>
        </>
    );
};
