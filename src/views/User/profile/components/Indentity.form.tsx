import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "antd";
import { InputField } from "components";
import { useStoreActions, useStoreState } from "hooks";
import { storage } from "utils";

type Props = {};

export const IndentityForm = (props: Props) => {
    const { loading } = useStoreState((state) => state.auth);
    const { updateUserData } = useStoreActions((actions) => actions.auth);

    const [user, setUser] = useState(null as unknown as any);

    useEffect(() => {
        const currentUser = storage.get("currentUser");
        setUser(currentUser);
    }, []);

    const onFinish = (values: any) => {
        updateUserData(values);
    };
    return (
        <>
            {user?.isAdmin ? (
                <div style={{ padding: "20px 0" }}>
                    <Alert
                        message="Attention"
                        description="L'administrateur ne peut pas mettre à jour son prénom ou son nom"
                        type="warning"
                        showIcon
                        closable
                    />
                </div>
            ) : null}
            <Form
                name="identity"
                className="login-form"
                onFinish={onFinish}
                layout="vertical"
                noValidate
            >
                <InputField
                    name="firstName"
                    required={true}
                    message="Veuillez entrer votre prenom!"
                    placeholder="Entrer votre prenom"
                    type="text"
                    label="Prenom"
                    disabled={user?.isAdmin ? true : false}
                    defaultValue={user?.firstName}
                />
                <InputField
                    name="lastName"
                    required={true}
                    message="Veuillez entrer votre nom!"
                    placeholder="Entrer votre nom"
                    type="text"
                    label="Nom"
                    disabled={user?.isAdmin ? true : false}
                    defaultValue={user?.lastName}
                />
                <InputField
                    name="email"
                    required={true}
                    message="Veuillez entrer votre email!"
                    placeholder="Entrer votre email"
                    type="email"
                    label="Email"
                    defaultValue={user?.email}
                />

                <Form.Item
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Sauvegarder
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
