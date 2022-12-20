import { Action, Thunk } from "easy-peasy";

export interface CommunitiesPayload {
    name: string;
}

export interface Communities {
    loading: boolean;
    communities: Array<any>;
    errors: any;

    request: Action<Communities>;
    success: Action<Communities>;
    failure: Action<Communities>;
    registerCommunity: Thunk<Communities, CommunitiesPayload>;
    getCommunities: Thunk<Communities>;
    deleteCommunity: Thunk<Communities, string>;
}
