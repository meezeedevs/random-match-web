import React from "react";

type Props = {
    text: string;
};

export const MaintenanceMessage = ({ text }: Props) => {
    return (
        <div style={{ height: "62vh" }}>
                <h1>
                    {text}
                </h1>
        </div>
    );
};
