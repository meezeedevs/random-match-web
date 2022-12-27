import React from "react";
import { Banner, Events, Posts, Quotes, VideoPosts } from "./components";

type Props = {};

export const HomeView = (props: Props) => {
    return (
        <div>
            <Banner />
            <Posts />
            <Quotes />
            <VideoPosts />
            <Events />
        </div>
    );
};
