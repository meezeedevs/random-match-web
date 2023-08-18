import { Action, Thunk } from "easy-peasy";

export interface MembersPayload {
    _id: any;
    username: string;
    isMatched: number;
    picked_by: string
}

export interface Members {
    loadingMembers: boolean;
    members: Array<MembersPayload>;
    errors: any;

    request: Action<Members>;
    success: Action<Members>;
    failure: Action<Members>;
    getMembers: Thunk<Members>;
    registerMember: Thunk<Members, any>;
    deleteMember: Thunk<Members, string>;
    updateMember: Thunk<Members, any>;
}
