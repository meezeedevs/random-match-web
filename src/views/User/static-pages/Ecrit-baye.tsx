import { useStoreActions, useStoreState } from "hooks";
import { useLocation } from "react-router-dom";

import { Container, Post } from "components";
import { Posts, VideoPosts } from "../home/components";
import { useEffect, useState } from "react";
import { Spin } from "antd";

type Props = {};

export const MenuEcritDeBaye = (props: Props) => {
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");

    const [postDetails, setPostDetails] = useState([] as any);

    const { loadingPosts, post } = useStoreState((state) => state.posts);

    const { getPostByTag } = useStoreActions((actions) => actions.posts);

    useEffect(() => {
        getPostByTag("63caf153efbc2f0027f2e4b9");
    }, [getPostByTag, id]);

    useEffect(() => {
        if (post && post.length > 0) setPostDetails(post[0]);
        else setPostDetails(post);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [post]);

    const youtubeIframe = (videoLink: any) => {
        var regex: any = "youtube";
        var link = videoLink;
        if (link.indexOf(regex) > -1)
            return (
                <div className="css-1x060qm" style={{ width: "100%" }}>
                    <iframe
                        width="100%"
                        height="300px"
                        src={postDetails?.video}
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
                    <div>
                        <Post
                            details={postDetails}
                            loading={loadingPosts}
                            youtubeIFrame={youtubeIframe}
                        />
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
