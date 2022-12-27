import { Container } from "components";
import React from "react";
import { Col, Row } from "antd";

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
    return (
        <Container>
            <div className="section-home">
                <div className="chakra-stack css-5zjxuu">
                    <h2 className="heading-2 text-center">
                        Contenu video aussi disponible
                    </h2>
                    <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        className="posts-cards"
                        style={{}}
                    >
                        {latestVideoPosts.map((vid: any) => (
                            <Col
                                className="gutter-row"
                                xs={{ span: 24 }}
                                md={{ span: 12 }}
                                lg={{ span: 8 }}
                                key={vid.id}
                            >
                                <div className="custom-card shadow-none">
                                    <div
                                        className="css-1x060qm"
                                        style={{ width: "100%" }}
                                    >
                                        <iframe
                                            width="100%"
                                            height="200px"
                                            src={vid.embed}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title="Embedded youtube"
                                            style={{ borderRadius: "22px" }}
                                        />
                                    </div>
                                    <div className="chakra-stack css-9fxg76">
                                        <h4 className="chakra-heading css-11useb">
                                            {vid.title}
                                        </h4>
                                        <p className="chakra-text css-jeh52q">
                                            {vid.description}
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
                        ))}
                    </Row>
                </div>
            </div>
        </Container>
    );
};
