import { InputField } from "components";
import { useStoreActions, useStoreState } from "hooks";
import React, { useEffect, useState } from "react";

type Props = {
    name: string;
    hasLabel?: boolean;
};

export const UsersSelect = ({ name, hasLabel }: Props) => {
    const [appUsers, setAppUsers] = useState([] as unknown as any);

    const { loadingUsers, users } = useStoreState((state) => state.users);
    const { getUsers } = useStoreActions((actions) => actions.users);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (users) {
            let datas: any = [];
            users.map((us: any) => {
                const data = {
                    label: `${us.firstName} ${us.lastName}`,
                    value: us._id,
                };
                return datas.push(data);
            });
            setAppUsers(datas);
        }
        return;
    }, [users]);
    return (
        <>
            {hasLabel || hasLabel === undefined ? (
                <InputField
                    name={name}
                    required={true}
                    message={`Please input your ${name}!`}
                    placeholder={`Select a ${name}`}
                    label={name}
                    select
                    loading={loadingUsers}
                    options={appUsers}
                />
            ) : (
                <InputField
                    name={name}
                    required={true}
                    message={`Please input your ${name}!`}
                    placeholder={`Select a ${name}`}
                    select
                    loading={loadingUsers}
                    options={appUsers}
                />
            )}
        </>
    );
};
