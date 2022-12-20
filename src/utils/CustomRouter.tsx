import { ReactNode, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

type Props = {
    basename?: string;
    children: ReactNode;
    history: any;
};

export const CustomRouter = ({ basename, children, history }: Props) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            basename={basename}
            children={children}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};
