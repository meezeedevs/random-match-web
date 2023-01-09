import { Action, Thunk } from "easy-peasy";

export interface CommunitiesPayload {
    name: string;
}

export interface Communities {
    loading: boolean;
    communities: Array<any>;
    myCommunities: Array<any>;
    loadingMembers: boolean;
    communityMembers: Array<any>;
    communitiesNotMember: Array<any>;
    userRequests: Array<any>;
    communityRequests: Array<any>;
    errors: any;

    request: Action<Communities>;
    success: Action<Communities>;
    failure: Action<Communities>;
    registerCommunity: Thunk<Communities, CommunitiesPayload>;
    getCommunities: Thunk<Communities>;
    deleteCommunity: Thunk<Communities, string>;

    getMyCommunities: Thunk<Communities, string>;
    getCommunitiesNotMember: Thunk<Communities, string>;
    joinCommunity: Thunk<Communities, any>;
    quitCommunity: Thunk<Communities, any>;

    getUserRequests: Thunk<Communities, string>;
    cancelUserRequest: Thunk<Communities, any>;
    getCommunityRequests: Thunk<Communities, string>;
    validateCommunityRequest: Thunk<Communities, any>;

    // registerCommunityMember: Thunk<Communities, CommunitiesPayload>;
    getCommunityMembers: Thunk<Communities, string>;
    deleteCommunityMember: Thunk<Communities, any>;
}
