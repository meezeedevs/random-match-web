import { InputField } from "components";
import { useStoreActions, useStoreState } from "hooks";
import React, { useEffect, useState } from "react";

type Props = {
    name: string;
};

export const CommunitiesSelect = ({ name }: Props) => {
    const [appcommunities, setAppcommunities] = useState([] as unknown as any);

    const { loading, communities } = useStoreState(
        (state) => state.communities
    );
    const { getCommunities } = useStoreActions(
        (actions) => actions.communities
    );

    useEffect(() => {
        getCommunities();
    }, [getCommunities]);

    useEffect(() => {
        if (communities) {
            console.log(communities);
            let datas: any = [];
            communities.map((us: any) => {
                const data = {
                    label: `${us.name}`,
                    value: us._id,
                };
                return datas.push(data);
            });
            setAppcommunities(datas);
        }
        return;
    }, [communities]);
    return (
        <InputField
            name={name}
            required={true}
            message={`Please input your ${name}!`}
            placeholder={`select a ${name}`}
            select
            loading={loading}
            options={appcommunities}
        />
    );
};
