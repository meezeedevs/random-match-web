import { Action, Thunk } from "easy-peasy";

export interface MembersPayload {
    _id: any;
    userName: string;
    password: string;
    isMatched: number;
    pickedBy?: any;
    pick?: any
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
