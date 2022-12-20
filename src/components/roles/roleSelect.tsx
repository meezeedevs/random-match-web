import { InputField } from "components";
import { useStoreActions, useStoreState } from "hooks";
import React, { useEffect, useState } from "react";

type Props = {
    name: string;
};

export const RoleSelect = ({ name }: Props) => {
    const [appRoles, setAppRoles] = useState([] as unknown as any);

    const { loadingRoles, roles } = useStoreState((state) => state.users);
    const { getRoles } = useStoreActions((actions) => actions.users);

    useEffect(() => {
        getRoles();
    }, [getRoles]);

    useEffect(() => {
        if (roles) {
            console.log(roles);
            let datas: any = [];
            roles.map((us: any) => {
                const data = {
                    label: `${us.name}`,
                    value: us._id,
                };
                return datas.push(data);
            });
            setAppRoles(datas);
        }
        return;
    }, [roles]);
    return (
        <InputField
            name={name}
            required={true}
            message={`Please input your ${name}!`}
            placeholder={`select a ${name}`}
            select
            loading={loadingRoles}
            options={appRoles}
            size="small"
        />
    );
};
