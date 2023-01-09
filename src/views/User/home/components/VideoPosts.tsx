import { Container } from "components";
import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { useStoreActions, useStoreState } from "hooks";
import { Link } from "react-router-dom";

const latestVideoPosts = [
    {
        id: 1,
        embed: "https://www.youtube.com/embed/bM-63T6_dHg",
        title: "La naissance de l'islam partout dans le monde",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 2,
        title: "Les musulmans du monde entier en pèlerinage ",
        embed: "https://www.youtube.com/embed/o7DZvfkVQHY",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 3,
        title: "Quels sont les cinq piliers de l'islam?",
        embed: "https://www.youtube.com/embed/QBoqUBVw5io",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
];

type Props = {};

export const VideoPosts = (props: Props) => {
    const [appPosts, setAppPosts] = useState([] as any);

    const { videoPost, loadingPosts } = useStoreState((state) => state.posts);
    const { getVideoPosts } = useStoreActions((actions) => actions.posts);

    useEffect(() => {
        getVideoPosts();
    }, [getVideoPosts]);

    useEffect(() => {
        if (videoPost) {
            setAppPosts(videoPost);
        }
        return;
    }, [videoPost]);
    return (
        <Container>
            <div className="section-home">
                <div className="chakra-stack css-5zjxuu">
                    <h2 className="heading-2 text-center">
                        Contenu video aussi disponible
                    </h2>
                    <Spin spinning={loadingPosts} tip="Chargement...">
                        <Row
                            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                            className="posts-cards"
                            style={{}}
                        >
                            {appPosts.map((post: any) => (
                                <Col
                                    className="gutter-row"
                                    xs={{ span: 24 }}
                                    md={{ span: 12 }}
                                    lg={{ span: 8 }}
                                    key={post._id}
                                >
                                    <div className="custom-card shadow-none">
                                        <div
                                            className="css-1x060qm"
                                            style={{ width: "100%" }}
                                        >
                                            <iframe
                                                width="100%"
                                                height="200px"
                                                src={post.video}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Embedded youtube"
                                                style={{ borderRadius: "22px" }}
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
