import { useStoreState } from "hooks";
import { Link } from "react-router-dom";

import {
    LeftOutlined,
    HeartOutlined,
    MessageOutlined,
} from "@ant-design/icons";

import post_img from "assets/images/posts-img.webp";
import { Container, useTitle } from "components";
import { Col, Row, Spin } from "antd";
import { routes } from "config";
import parse from "html-react-parser";
import { Posts, VideoPosts } from "../home/components";

type Props = {};

export const PublicationDetailsView = (props: Props) => {
    // const search = useLocation().search;
    // const id = new URLSearchParams(search).get("id");

    // console.log(id);

    // const [post, setPost] = useState([] as any);

    const { loadingPosts, post } = useStoreState((state) => state.posts);
    // const { users } = useStoreState((state) => state.users);

    // const { getPostById } = useStoreActions(
    //     (actions) => actions.posts
    // );

    // useEffect(() => {
    //     getPostById(id as string);
    // }, [getPostById, id, users]);

    const youtubeIframe = (videoLink: any) => {
        var regex: any = "youtube";
        var link = videoLink;
        if (link.indexOf(regex) > -1)
            return (
                <div className="css-1x060qm" style={{ width: "100%" }}>
                    <iframe
                        width="100%"
                        height="300px"
                        src={post.video}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        style={{ borderRadius: "22px" }}
                    />
                </div>
            );
        else return null;
    };

    return (
        <>
            <Container>
                <Spin spinning={loadingPosts} tip="chargement...">
                    <Link to={routes.publications} style={{ color: "#00ba71" }}>
                        <div
                            style={{
                                display: "flex",
                                // marginBottom: "2.5rem",
                                cursor: "pointer",
                                position: "sticky",
                                top: "6vh",
                                background: "#fff",
                                padding: "3rem 0 3rem 0",
                                width: "100%",
                                zIndex: 1,
                                alignItems: "center",
                            }}
                        >
                            <LeftOutlined />
                            <span style={{ marginLeft: "5px" }}>Retour</span>
                        </div>
                    </Link>
                    <div className="css-luuvyl">
                        <Row
                            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                            style={{ marginBottom: "2rem" }}
                        >
                            <Col
                                xs={{ span: 24 }}
                                md={{ span: 24 }}
                                lg={{ span: 14 }}
                            >
                                <div>
                                    <h2 className="heading-4">
                                        {post.title}
                                        {useTitle(`${post.title}`)}
                                    </h2>
                                    <p className="chakra-text css-4v9y6b">
                                        {parse(post.content)}
                                    </p>
                                    <hr />
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "180px",
                                            justifyContent: "space-between",
                                            margin: "20px 0 0 0",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "2px 15px",
                                                backgroundColor: "#F3F4F6",
                                                borderRadius: "15px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <MessageOutlined />
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: 500,
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                10
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "2px 15px",
                                                backgroundColor: "#F3F4F6",
                                                borderRadius: "15px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <HeartOutlined />
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: 500,
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                57
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                xs={{ span: 24 }}
                                md={{ span: 24 }}
                                lg={{ span: 10 }}
                            >
                                <div>
                                    <img
                                        alt="La naissance de l'islam partout dans le monde"
                                        src={post.image ? post.image : post_img}
                                        loading="lazy"
                                        className="chakra-image css-13s8ik"
                                        style={{ maxWidth: "100%" }}
                                    />
                                    {post.video ? (
                                        <>
                                            <div style={{ marginTop: "2rem" }}>
                                                Contenu video disponible:{" "}
                                                <a
                                                    target="_blank"
                                                    href={post.video}
                                                    rel="noreferrer"
                                                    style={{ color: "#00ba71" }}
                                                >
                                                    {post.video}
                                                </a>
                                            </div>
                                            {youtubeIframe(post.video)}
                                        </>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Spin>
            </Container>
            <div style={{ background: "#F3F4F6" }}>
                <Container>
                    <Posts />
                    <VideoPosts />
                </Container>
            </div>
        </>
    );
};
