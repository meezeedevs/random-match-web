import { Divider } from "antd";
import { useTitle } from "components";
import React from "react";
import { PostsForm, PostsList } from "./components";

type Props = {};

export const PostsView = (props: Props) => {
    useTitle("Publications(admin)");
    return (
        <div>
            <h1 style={{ fontSize: "25px" }}>Les publications</h1>
            <Divider />
            <h3>Creation de publications</h3>
            <div>
                <PostsForm />
            </div>
            <Divider />
            <h3>Liste des publications</h3>

            <div>
                <PostsList />
            </div>
        </div>
    );
};
