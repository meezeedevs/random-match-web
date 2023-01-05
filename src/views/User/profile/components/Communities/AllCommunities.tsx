import React from "react";
import { CommunitiesList } from "views/Admin/Communities/components";

type Props = {};

export const AllCommunities = (props: Props) => {
    return (
        <div>
            <CommunitiesList list="users" />
        </div>
    );
};
