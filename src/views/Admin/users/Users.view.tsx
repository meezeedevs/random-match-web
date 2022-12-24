import { Divider } from "antd";
import React from "react";
import { UserForm, UsersList } from "./components";

type Props = {};

export const UsersView = (props: Props) => {
    return (
        <div>
            <h1 style={{ fontSize: "25px" }}>Les Utilisateurs</h1>
            <Divider />
            <h3>Creation d'un utilisateur</h3>
            <div>
                <UserForm />
            </div>
            <Divider />
            <h3>Liste des utilisateurs</h3>

            <div>
                <UsersList />
            </div>
        </div>
    );
};
