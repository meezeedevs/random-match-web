import { Container } from "components";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Spin } from "antd";
import { useStoreActions, useStoreState } from "hooks";
import { Link } from "react-router-dom";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";
import styled from "styled-components";

const ContainerSwiperButtons = styled.div`
    display: flex;
    justify-content: center;
    @media screen and (max-width: 768px) {
        display: none;
    }

    .swiper-button-prev,
    .swiper-button-next {
        border-radius: 10px;
        border: solid #00ba71 1px;
        background-color: transparent;
        font-weight: 600;
        width: 50px;
        height: 35px;
        position: relative;
        top: 14rem;
        color: #00ba71;
    }

    .swiper-button-prev {
        left: -5vw;
    }

    .swiper-button-next {
        right: -5vw;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
        color: #00ba71;
    }

    .swiper-button-next::after {
        content: "";
    }

    .swiper-button-prev::after {
        content: "";
    }
`;

type Props = {};

export const VideoPosts = (props: Props) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

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

    const convertEmbed = (post: string) => {
        var regex: any = "embed";
        var path = post;
        if (path.indexOf(regex) > -1) {
            return post;
        } else
            return `https://www.youtube.com/embed/${new URL(
                post
            ).searchParams.get("v")}?feature=oembed`;
    };
    return (
        <Container>
            <div className="section-home">
                <div className="chakra-stack css-5zjxuu">
                    <h2 className="heading-2 text-center">
                        Contenu video aussi disponible
                    </h2>
                    <Spin spinning={loadingPosts} tip="Chargement...">
                        <ContainerSwiperButtons>
                            <div className="swiper-button-container" style={{}}>
                                {/* Swipper prev button */}
                                <button
                                    className="swiper-button-prev"
                                    ref={navigationPrevRef}
                                >
                                    <LeftOutlined color="#00ba71" />
                                </button>
                                {/* Swipper next button */}
                                <button
                                    className="swiper-button-next"
                                    ref={navigationNextRef}
                                >
                                    <RightOutlined color="#00ba71" />
                                </button>
                            </div>
                        </ContainerSwiperButtons>
                        <Row
                            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                            // className="posts-cards"
                            style={{}}
                        >
                            <Swiper
                                breakpoints={{
                                    // when window width is >= 640px
                                    640: {
                                        slidesPerView: 1,
                                    },
                                    // when window width is >= 768px
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    // when window width is >= 768px
                                    1080: {
                                        slidesPerView: 3,
                                    },
                                }}
                                spaceBetween={30}
                                freeMode={true}
                                loop
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}
                                onBeforeInit={(swiper: any) => {
                                    swiper.params.navigation.prevEl =
                                        navigationPrevRef.current;
                                    swiper.params.navigation.nextEl =
                                        navigationNextRef.current;
                                }}
                                modules={[Pagination, Navigation]}
                                className="posts-cards"
                                style={{ minHeight: "580px" }}
                            >
                                {appPosts.map((post: any) => (
                                    <Col
                                        className="gutter-row"
                                        xs={{ span: 24 }}
                                        md={{ span: 12 }}
                                        lg={{ span: 8 }}
                                        key={post._id}
                                    >
                                        <SwiperSlide key={post._id}>
                                            <div className="custom-card">
                                                <div
                                                    className="css-1x060qm"
                                                    style={{ width: "100%" }}
                                                >
                                                    <iframe
                                                        width="100%"
                                                        height="200px"
                                                        src={convertEmbed(
                                                            post.video
                                                        )}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        title="Embedded youtube"
                                                        style={{
                                                            borderRadius:
                                                                "22px",
                                                        }}
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
                                        </SwiperSlide>
                                    </Col>
                                ))}
                            </Swiper>
                        </Row>
                    </Spin>
                </div>
            </div>
        </Container>
    );
};
