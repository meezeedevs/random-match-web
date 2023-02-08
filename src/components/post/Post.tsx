import { Col, Row } from "antd";
import { useTitle } from "components/document-head";
import parse from "html-react-parser";
import post_img from "assets/images/posts-img.webp";
import { MaintenanceMessage } from "components";

type Props = {
    details: any;
    youtubeIFrame: any;
    loading: boolean;
};

export const Post = ({ details, youtubeIFrame, loading }: Props) => {
    useTitle(`${details?.title}`);
    return (
        <div className="post-detail-content" style={{ minHeight: "500px" }}>
            {loading ? null : details && Object.entries(details).length > 0 ? (
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{ marginBottom: "2rem" }}
                >
                    <Col
                        xs={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: details?.image ? 14 : 24 }}
                    >
                        <div>
                            <h1 className="heading-1">{details?.title}</h1>
                            <p className="chakra-text css-4v9y6b">
                                {details?.content
                                    ? parse(details?.content)
                                    : null}
                            </p>
                            <div>
                                {details?.video && !details?.image ? (
                                    <>
                                        <div
                                            style={{
                                                marginTop: "2rem",
                                            }}
                                        >
                                            Contenu video disponible:{" "}
                                            <a
                                                target="_blank"
                                                href={details?.video}
                                                rel="noreferrer"
                                                style={{
                                                    color: "#00ba71",
                                                }}
                                            >
                                                {details?.video}
                                            </a>
                                        </div>
                                        {youtubeIFrame(details?.video)}
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </Col>
                    {details?.image ? (
                        <Col
                            xs={{ span: 24 }}
                            md={{ span: 24 }}
                            lg={{ span: 10 }}
                        >
                            {loading ? null : (
                                <div>
                                    <img
                                        alt="La naissance de l'islam partout dans le monde"
                                        src={
                                            details?.image
                                                ? details?.image
                                                : post_img
                                        }
                                        loading="lazy"
                                        className="chakra-image css-13s8ik"
                                        style={{ maxWidth: "100%" }}
                                    />

                                    {details?.video ? (
                                        <>
                                            <div
                                                style={{
                                                    marginTop: "2rem",
                                                }}
                                            >
                                                Contenu video disponible:{" "}
                                                <a
                                                    target="_blank"
                                                    href={details?.video}
                                                    rel="noreferrer"
                                                    style={{
                                                        color: "#00ba71",
                                                    }}
                                                >
                                                    {details?.video}
                                                </a>
                                            </div>
                                            {youtubeIFrame(details?.video)}
                                        </>
                                    ) : null}
                                </div>
                            )}
                        </Col>
                    ) : null}
                </Row>
            ) : (
                <MaintenanceMessage text="comming soon" />
            )}
        </div>
    );
};
