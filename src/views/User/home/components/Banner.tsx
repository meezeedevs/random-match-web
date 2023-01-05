import { Container } from "components";
import React from "react";
import styled from "styled-components";

import bg from "assets/images/bg.png";
import cheik from "assets/images/cheik-aziz.png";
import { Col, Row } from "antd";

const StyledBanner = styled.div`
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    min-height: 50vh;
    background-image: url(${bg});
    background-color: #1a2633;
    background-repeat: no-repeat;
    /* } */

    .banner-container {
        padding-top: 2.5rem;
        color: white;
        p {
            font-size: 1.25rem;
            margin-top: 2.5rem;
        }
    }
    @media screen and (min-width: 62em) {
        .banner-container {
            padding-top: 7rem;
        }
    }
`;

type Props = {};

export const Banner = (props: Props) => {
    return (
        <StyledBanner>
            {/* <div className="content"> */}
            <Container className="banner-container">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col
                        className="gutter-row text-side"
                        xs={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: 14 }}
                    >
                        <h1 className="heading-1">
                            Au Service de Baye pour Sauver la Jeunesse
                        </h1>
                        <p className="chakra-text css-8ikiq8">
                            Commencer par le commencement et prendre le droit
                            chemin avec patience, Baye Niass à la jeunesse
                        </p>
                    </Col>
                    <Col
                        className="gutter-row"
                        xs={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: 8 }}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <img
                            alt="Cheik Aziz"
                            src={cheik}
                            loading="lazy"
                            className="chakra-image css-si6xzh"
                            style={{
                                height: "auto",
                                maxHeight: "50vh",
                                maxWidth: "100%",
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            {/* </div> */}
        </StyledBanner>
    );
};
