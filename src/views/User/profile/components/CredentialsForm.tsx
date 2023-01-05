import React from "react";
import { Button, Form } from "antd";
import { InputField } from "components";
import { useStoreActions, useStoreState } from "hooks";

type Props = {};

export const CredentialsForm = (props: Props) => {
    const { loading } = useStoreState((state) => state.auth);
    const { updateUserCredentials } = useStoreActions(
        (actions) => actions.auth
    );

    const onFinish = (values: any) => {
        const data = {
            oldPassword: values.oldPassword,
            newPassword: values.password,
            newPassword2: values.password2,
        };
        updateUserCredentials(data);
    };
    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            layout="vertical"
            noValidate
        >
            <InputField
                name="oldPassword"
                required={true}
                message="Veuillez entrer votre actuel mot de passe!"
                placeholder="Entrer votre actuel mot de passe"
                type="password"
                label="Actuel mot de passe"
                isPassword
                hasFeedback
            />
            <InputField
                name="password"
                required={true}
                message="Veuillez entrer votre nouveau mot de passe!"
                placeholder="Entrer votre nouveau mot de passe"
                type="password"
                isPassword={true}
                label="Nouveau mot de passe"
                hasFeedback
            />
            <InputField
                name="password2"
                required={true}
                message="Veuillez confirmer votre nouveau mot de passe!"
                placeholder="Confirmer votre nouveau mot de passe"
                type="password"
                isPassword2={true}
                label="Confirmer le nouveau mot de passe"
                hasFeedback
            />

            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Sauvegarder
                </Button>
            </Form.Item>
        </Form>
    );
};
