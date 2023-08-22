import { Alert, Divider } from "antd";
import { useTitle } from "components";
import React, { useEffect } from "react";
import { MemberForm, MembersList } from "./components";
import { redirectTo } from "utils";

type Props = {};

export const MembersView = (props: Props) => {
    useTitle("Members(admin)");
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('currentUser') as any)
        console.log(user)
        if(!user?.isAdmin) redirectTo('/')
    },[])
    return (
        <div>
            <h1 style={{ fontSize: "25px" }}>Members</h1>
            <Alert
                        message="Information"
                        description={`A member who has chosen or has been chosen can not be deleted.`}
                        type="warning"
                        showIcon
                        closable
                    />
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
