import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    className?: string;
};

export const ContainerStyle = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 576px) {
        max-width: 576px;
    }

    @media (min-width: 768px) {
        max-width: 98%;
    }

    @media (min-width: 992px) {
        max-width: 1200 px;
    }

    @media (min-width: 1200px) {
        max-width: 1200px;
    }
`;

export const Container = (props: Props) => {
    return <ContainerStyle {...props} />;
};
