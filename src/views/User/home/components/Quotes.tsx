import { Row, Col } from "antd";
import { Container } from "components";
import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires
import { Carousel } from "react-responsive-carousel";

import mosque from "assets/images/mosque.png";
import mosque_2 from "assets/images/mosque-2.jpg";

type Props = {};

const slides = [
    {
        image: mosque,
        text: "Islam is an academic, educational website which aims to offer advice and academic answers based on evidence from religious texts in an adequate and easy to understand manner.",
        author: "Cheikh Aziz Ndiaye",
    },
    {
        image: mosque_2,
        text: "Commencer par le commencement et prendre le droit chemin avec patience, Baye Niass à la jeunesse",
        author: "Cheikh Aziz Ndiaye",
    },
];

export const Quotes = (props: Props) => {
    return (
        <div
            style={{
                backgroundColor: "#F3F4F6",
            }}
        >
            <Container>
                <div
                    className="section-home"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="carousel-container">
                        <Carousel
                            infiniteLoop
                            showArrows={false}
                            autoPlay
                            showIndicators
                            showThumbs={false}
                        >
                            {slides.map((slide: any, i: any) => {
                                return (
                                    <Row
                                        gutter={{
                                            xs: 8,
                                            sm: 16,
                                            md: 24,
                                            lg: 32,
                                        }}
                                        style={{}}
                                        key={i}
                                    >
                                        <Col
                                            className="gutter-row"
                                            xs={{ span: 24 }}
                                            md={{ span: 24 }}
                                            lg={{ span: 12 }}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    backgroundImage: `url('${slide.image}')`,
                                                    width: "340px",
                                                    height: "280px",
                                                    borderRadius: "22px",
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundSize: "cover",
                                                }}
                                            ></div>
                                        </Col>
                                        <Col
                                            className="gutter-row"
                                            xs={{ span: 24 }}
                                            md={{ span: 24 }}
                                            lg={{ span: 12 }}
                                        >
                                            <div
                                                style={{ textAlign: "center" }}
                                            >
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            "Plus Jakarta Sans",
                                                        fontStyle: "italic",
                                                        fontWeight: "400",
                                                        fontSize: "18px",
                                                        lineHeight: "28px",
                                                        textAlign: "center",

                                                        color: "#373737",
                                                        height: "200px",

                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    &ldquo; {slide.text} &ldquo;
                                                </p>
                                                <p
                                                    style={{
                                                        fontStyle: "italic",
                                                        fontWeight: "400",
                                                        fontSize: "14px",
                                                        lineHeight: "20px",

                                                        color: "#373737",
                                                    }}
                                                >
                                                    - {slide.author}
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Carousel>
                    </div>
                </div>
            </Container>
        </div>
    );
};
