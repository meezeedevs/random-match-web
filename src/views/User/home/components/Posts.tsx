import { Container } from "components";
import React from "react";

import post_img from "assets/images/posts-img.webp";
import { Col, Row } from "antd";

type Props = {};

export const Posts = (props: Props) => {
    return (
        <Container>
            <div className="section-home">
                <div className="chakra-stack css-5zjxuu">
                    <h2 className="heading-2 text-center">
                        Recommandation et Avis du Cheikh
                    </h2>
                    <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        className="posts-cards"
                        style={{}}
                    >
                        <Col
                            className="gutter-row text-side"
                            xs={{ span: 24 }}
                            md={{ span: 12 }}
                            lg={{ span: 8 }}
                        >
                            <div className="custom-card">
                                <div className="css-1x060qm">
                                    <img
                                        alt="La naissance de l'islam partout dans le monde"
                                        src={post_img}
                                        loading="lazy"
                                        className="chakra-image css-1t937k9"
                                    />
                                </div>
                                <div className="chakra-stack css-9fxg76">
                                    <h4 className="chakra-heading css-11useb">
                                        La naissance de l'islam partout dans le
                                        monde
                                    </h4>
                                    <p className="chakra-text css-jeh52q">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua.Lorem ipsum dolor
                                        sit amet,
                                    </p>
                                    <a
                                        className="custom-button"
                                        href="/publication?id=1"
                                    >
                                        Voir plus
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <Col
                            className="gutter-row text-side"
                            xs={{ span: 24 }}
                            md={{ span: 12 }}
                            lg={{ span: 8 }}
                        >
                            <div className="custom-card">
                                <div className="css-1x060qm">
                                    <img
                                        alt="Les musulmans du monde entier en pèlerinage "
                                        src={post_img}
                                        loading="lazy"
                                        className="chakra-image css-1t937k9"
                                    />
                                </div>
                                <div className="chakra-stack css-9fxg76">
                                    <h4 className="chakra-heading css-11useb">
                                        Les musulmans du monde entier en
                                        pèlerinage{" "}
                                    </h4>
                                    <p className="chakra-text css-jeh52q">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua.Lorem ipsum dolor
                                        sit amet, consectetur adipiscing elit,
                                        sed do eiusmod tempor incididunt ut
                                        labore et dolore magna aliqua.Lorem
                                        ipsum dolor sit amet,
                                    </p>
                                    <a
                                        className="custom-button"
                                        href="/publication?id=2"
                                    >
                                        Voir plus
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <Col
                            className="gutter-row text-side"
                            xs={{ span: 24 }}
                            md={{ span: 12 }}
                            lg={{ span: 8 }}
                        >
                            <div className="custom-card">
                                <div className="css-1x060qm">
                                    <img
                                        alt="Quels sont les quatres piliers de l'islam?"
                                        src={post_img}
                                        loading="lazy"
                                        className="chakra-image css-1t937k9"
                                    />
                                </div>
                                <div className="chakra-stack css-9fxg76">
                                    <h4 className="chakra-heading css-11useb">
                                        Quels sont les quatres piliers de
                                        l'islam?
                                    </h4>
                                    <p className="chakra-text css-jeh52q">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.Lorem ipsum dolor sit amet,
                                        aliqua.
                                    </p>
                                    <a
                                        className="custom-button"
                                        href="/publication?id=3"
                                    >
                                        Voir plus
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
};
