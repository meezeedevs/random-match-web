import { Alert } from "antd";
import React from "react";

type Props = {};

export const MyCommunities = (props: Props) => {
    return (
        <div>
            <Alert
                message="Bientot"
                description="Section bientot disponible"
                type="info"
                showIcon
                closable
            />
        </div>
    );
};
