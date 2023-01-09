import { Col, Row, Spin } from "antd";
import { Container, useTitle } from "components";
import { useStoreActions, useStoreState } from "hooks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

import post_img from "assets/images/posts-img.webp";

type Props = {};

export const PublicationsView = (props: Props) => {
    useTitle("Publications");
    const [appPosts, setAppPosts] = useState([] as any);

    const { posts, loadingPosts } = useStoreState((state) => state.posts);
    const { getPosts } = useStoreActions((actions) => actions.posts);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    useEffect(() => {
        if (posts) {
            const datas: any = [];
            posts.map((ps) => {
                const data = {
                    key: ps._id,
                    ...ps,
                };
                return datas.push(data);
            });
            setAppPosts(datas);
        }
        return;
    }, [posts]);
    return (
        <div>
            <Container>
                <div
                    style={{
                        marginTop: "4rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1 style={{ marginBottom: 0 }} className="heading-2">
                        Publications
                    </h1>
                    <div className="action-filters">
                        <div>
                            <SearchOutlined />
                        </div>
                        <div>
                            <FilterOutlined />
                        </div>
                    </div>
                </div>
                <div>
                    <Spin spinning={loadingPosts} tip="Chargement...">
                        <Row
                            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                            className="posts-cards"
                            style={{ marginBottom: "4rem" }}
                        >
                            {appPosts.map((post: any) => (
                                <Col
                                    className="gutter-row text-side"
                                    xs={{ span: 24 }}
                                    md={{ span: 12 }}
                                    lg={{ span: 8 }}
                                    key={post._id}
                                >
                                    <div className="custom-card">
                                        <div className="card-img-container">
                                            <img
                                                alt="La naissance de l'islam partout dans le monde"
                                                src={
                                                    post.img
                                                        ? post.img
                                                        : post_img
                                                }
                                                loading="lazy"
                                                className="chakra-image card-img"
                                            />
                                        </div>
                                        <div className="chakra-stack card-content">
                                            <h4 className="chakra-heading card-title">
                                                {post.title}
                                            </h4>
                                            <p className="chakra-text card-description text-left">
                                                {post.description}
                                            </p>
                                            <div
                                                className="custom-button"
                                                // onClick={() => {
                                                //     setPost(post);
                                                //     redirectTo(
                                                //         `/publication?id=${post._id}`
                                                //     );
                                                // }}
                                            >
                                                <Link
                                                    to={`/publication?id=${post._id}`}
                                                >
                                                    Voir plus
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Spin>
                </div>
            </Container>
        </div>
    );
};
