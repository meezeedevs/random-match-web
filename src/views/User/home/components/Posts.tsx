import { Container } from "components";
import React, { useEffect, useState } from "react";

import post_img from "assets/images/posts-img.webp";
import { Col, Row, Spin } from "antd";
import { useStoreActions, useStoreState } from "hooks";
import { Link } from "react-router-dom";

type Props = {};

export const Posts = (props: Props) => {
    const [appPosts, setAppPosts] = useState([] as any);

    const { latestPost, loadingPosts } = useStoreState((state) => state.posts);
    const { getLatestPosts } = useStoreActions((actions) => actions.posts);

    useEffect(() => {
        getLatestPosts();
    }, [getLatestPosts]);

    useEffect(() => {
        if (latestPost) {
            setAppPosts(latestPost);
        }
        return;
    }, [latestPost]);
    return (
        <Container>
            <div className="section-home">
                <div className="chakra-stack css-5zjxuu">
                    <h2 className="heading-2 text-center">
                        Recommandation et Avis du Cheikh
                    </h2>
                    <Spin spinning={loadingPosts} tip="Chargement...">
                        <Row
                            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                            className="posts-cards"
                            style={{}}
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
            </div>
        </Container>
    );
};
