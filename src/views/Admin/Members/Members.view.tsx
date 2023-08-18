import { Divider } from "antd";
import { useTitle } from "components";
import React from "react";
import { MemberForm, MembersList } from "./components";

type Props = {};

export const MembersView = (props: Props) => {
    useTitle("Members(admin)");
    return (
        <div>
            <h1 style={{ fontSize: "25px" }}>Members</h1>
            <Divider />
            <h3>Member creation</h3>
            <div>
                <MemberForm />
            </div>
            <Divider />
            <h3>Members List</h3>

            <div>
                <MembersList />
            </div>
        </div>
    );
};
