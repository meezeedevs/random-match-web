import { useTitle } from "components";
import { Banner, Events, Posts, Quotes, VideoPosts } from "./components";

type Props = {};

export const HomeView = (props: Props) => {
    useTitle("Home");
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
