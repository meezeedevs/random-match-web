import { Button } from "antd";
import { Container } from "components";
import React from "react";
import styled from "styled-components";

const StyledHomeEventList = styled.div`
    .section-home-event {
        display: flex;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        border-radius: 0.75rem;
        border: 1px solid;
        border-color: #edf2f7;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        -webkit-padding-start: 1.5rem;
        padding-inline-start: 1.5rem;
        -webkit-padding-end: 1.5rem;
        padding-inline-end: 1.5rem;
        width: 100%;
        margin: 15px 0;
    }
    .event-content {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .date {
        font-size: 1.25rem;
        font-weight: 700;
        p {
            margin-bottom: 0;
        }
    }
    .divider {
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
        height: 50px;
        border-color: #e2e8f0;
        word-wrap: break-word;

        margin-inline-start: 4rem;

        hr {
            opacity: 0.6;
            border: 0;
            border-color: inherit;
            border-style: solid;
            border-left-width: 1px;
            height: 100%;
        }
    }
    .title {
        margin-inline-start: 4rem;
    }
    .location {
        font-size: 16px;
    }

    @media screen and (max-width: 768px) {
        .event-content {
            display: block;
        }
        .divider {
            display: none;
        }
        .title {
            margin-inline-start: 0;
            margin: 10px 0;
        }
    }
    @media screen and (max-width: 600px) {
        .section-home-event {
            display: block;
        }
    }
`;

const events = [
    {
        id: 1,
        title: "Dua Tawwasul",
        date: "22 Fév",
        location: "17h30, Convention City Bashundhara",
    },

    {
        id: 2,
        title: "Dua Kumayl",
        date: "23 Fév",
        location: "17h30, Balishira Resort",
    },

    {
        id: 3,
        title: "Salat al-Jumu'a",
        date: "24 Fév",
        location: "17h30, Convention City Bashundhara",
    },

    {
        id: 4,
        title: "Weekly Program",
        date: "25 Fév",
        location: "17h30, Balishira Resort",
    },
];

type Props = {};

export const Events = (props: Props) => {
    return (
        <Container>
            <div className="section-home">
                <StyledHomeEventList>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h2 className="heading-2">Agenda de la Khadra</h2>
                        <div className="actions">
                            <Button type="primary" size="large">
                                Afficher tout
                            </Button>
                        </div>
                    </div>
                    <div>
                        {events.map((ev) => (
                            <div className="section-home-event" key={ev.id}>
                                <div className="event-content">
                                    <div className="date">
                                        <p>{ev.date}</p>
                                    </div>
                                    <div className="divider">
                                        <hr />
                                    </div>
                                    <div className="title">
                                        <h4 className="heading-4">
                                            {ev.title}
                                        </h4>
                                        <div className="location">
                                            <p>{ev.location}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="action">
                                    <a
                                        className="custom-button"
                                        href="/evenements?id=1"
                                    >
                                        Voir les details
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </StyledHomeEventList>
            </div>
        </Container>
    );
};
