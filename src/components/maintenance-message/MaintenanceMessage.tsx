import { Container } from "components/container";
import React from "react";

type Props = {
    text: string;
};

export const MaintenanceMessage = ({ text }: Props) => {
    return (
        <div style={{ height: "62vh" }}>
            <Container>
                <h1 className="heading-1" style={{ marginTop: "4rem" }}>
                    {text}
                </h1>
            </Container>
        </div>
    );
};
