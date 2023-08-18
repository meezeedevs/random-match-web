import { Action, Thunk } from "easy-peasy";

export interface Users {
    loadingUnmatched: boolean;
    unmatched: Array<any>;
    errors: any;

    request: Action<Users>;
    success: Action<Users>;
    failure: Action<Users>;
    getUnmatched: Thunk<Users>;
    sendMatch: Thunk<Users, any>;
}
