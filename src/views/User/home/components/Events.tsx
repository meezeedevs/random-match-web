import { Button, Spin } from "antd";
import { Container } from "components";
import { routes } from "config";
import { useStoreActions, useStoreState } from "hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

// const events = [
//     {
//         id: 1,
//         title: "Dua Tawwasul",
//         date: "22 Fév",
//         location: "17h30, Convention City Bashundhara",
//     },

//     {
//         id: 2,
//         title: "Dua Kumayl",
//         date: "23 Fév",
//         location: "17h30, Balishira Resort",
//     },

//     {
//         id: 3,
//         title: "Salat al-Jumu'a",
//         date: "24 Fév",
//         location: "17h30, Convention City Bashundhara",
//     },

//     {
//         id: 4,
//         title: "Weekly Program",
//         date: "25 Fév",
//         location: "17h30, Balishira Resort",
//     },
// ];

type Props = {};

export const Events = (props: Props) => {
    const [appEvents, setAppEvents] = useState([] as unknown as any);

    const { loading, upcomingEvents } = useStoreState((state) => state.events);
    const { getUpcomingEvents } = useStoreActions((actions) => actions.events);

    useEffect(() => {
        getUpcomingEvents();
    }, [getUpcomingEvents]);

    useEffect(() => {
        if (upcomingEvents) setAppEvents(upcomingEvents);
        return;
    }, [upcomingEvents]);

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
                        <h2 className="heading-2">Événements à venir</h2>
                        <div className="actions">
                            <Link to={routes.evenements}>
                                <Button type="primary" size="large">
                                    Afficher tout
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <Spin spinning={loading}>
                        {appEvents.map((ev: any) => (
                            <div className="section-home-event" key={ev._id}>
                                <div className="event-content">
                                    <div className="date">
                                        <p>
                                            {moment(ev.dueDate).format(
                                                "MMM Do YY"
                                            )}
                                        </p>
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
                                    <Link
                                        to={`${routes.evenements}?goto=${ev.dueDate}`}
                                    >
                                        <Button
                                            type="primary"
                                            size="large"
                                            className="custom-button"
                                        >
                                            Voir les details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Spin>
                </StyledHomeEventList>
            </div>
        </Container>
    );
};
