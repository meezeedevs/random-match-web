import { thunk, action } from "easy-peasy";
import { Communities, CommunitiesPayload } from "state/types";
import { client } from "config";

import { message, notification } from "antd";

// const success = () => {
//     message.success("Signed in successfully");
// };

const error = (error: any) => {
    if (error?.name) {
        switch (error?.name) {
            case "EMAIL_TYPE":
                message.error("Email invalid");
                break;
            case "USER_EXIST_NOT":
                message.error("Email does not exist");
                break;
            case "EMAIL_EMPTY":
                message.error("You're trying to login with an empty email");
                break;
            default:
                message.error("Something went wrong, try again later");
                break;
        }
    } else if (error?.message) {
        switch (error?.message) {
            case "NOT_OWNER":
                message.error(
                    "It seems you're trying to recover the account wrongly, please follow the guidelines!!!"
                );
                break;
            default:
                message.error("Something went wrong, try again later");
                break;
        }
    } else
        notification.error({
            message: "Ooopss!!",
            description:
                "Something went wrong, try again later and if it persist contact the IT team",
            duration: 0,
        });
};

export const CommunitiesModel: Communities = {
    loading: false,
    communities: [],
    loadingMembers: false,
    communityMembers: [],
    communitiesNotMember: [],
    myCommunities: [],
    userRequests: [],
    communityRequests: [],
    errors: {},

    request: action((state, payload: any) => {
        if (payload.isMembers) return (state.loadingMembers = payload.loader);
        else return (state.loading = payload.loader);
    }),

    success: action((state, payload: any) => {
        if (payload.isMembers) return (state.communityMembers = payload.data);
        if (payload.isMyCommunities)
            return (state.myCommunities = payload.data);
        if (payload.isNotMyCommunities)
            return (state.communitiesNotMember = payload.data);
        if (payload.isUserRequests) return (state.userRequests = payload.data);
        if (payload.isCommunityRequests)
            return (state.communityRequests = payload.data);
        else return (state.communities = payload.data);
        // return (state.loading = payload);
    }),
    failure: action((state, payload: any) => {
        if (payload !== null) {
            error(payload);
        } else message.error("Something went wrong, try again later");
        return (state.errors = payload);
    }),

    registerCommunity: thunk(async (actions, payload: CommunitiesPayload) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().post(`/community`, payload);
            if (response.data) {
                message.success("Community created");
                actions.getCommunities();
                actions.request({ isMembers: false, loader: false } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: false, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    getCommunities: thunk(async (actions) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().get(`/community`);
            if (response.data) {
                actions.request({ isMembers: false, loader: false } as any);
                actions.success({
                    isMembers: false,
                    data: response.data,
                } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: false, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),

    getMyCommunities: thunk(async (actions, payload) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().get(`/community/user/${payload}`);
            if (response.data) {
                actions.request({ isMembers: false, loader: false } as any);
                actions.success({
                    isMyCommunities: true,
                    data: response.data,
                } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: false, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    getCommunitiesNotMember: thunk(async (actions, payload) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().get(
                `/community/notUser/${payload}`
            );
            if (response.data) {
                actions.request({ isMembers: false, loader: false } as any);
                actions.success({
                    isNotMyCommunities: true,
                    data: response.data,
                } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: true, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    getUserRequests: thunk(async (actions, payload) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().get(`/request/user/${payload}`);
            if (response.data) {
                actions.request({ isMembers: false, loader: false } as any);
                actions.success({
                    isUserRequests: true,
                    data: response.data,
                } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: true, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    getCommunityRequests: thunk(async (actions, payload) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().get(`/request/${payload}`);
            if (response.data) {
                actions.request({ isMembers: false, loader: false } as any);
                actions.success({
                    isCommunityRequests: true,
                    data: response.data,
                } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: true, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    joinCommunity: thunk(async (actions, payload: any) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().post(`/request`, payload);

            if (response.data) {
                message.success("Requette envoye");
                actions.getCommunitiesNotMember(payload.user);
                actions.request({ isMembers: false, loader: false } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: false, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    quitCommunity: thunk(async (actions, payload: any) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().delete(`/role/${payload.id}`);
            if (response.data) {
                message.success("Community quited");
                actions.getMyCommunities(payload.user);
                actions.request({ isMembers: false, loader: false } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: false, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);
            // console.log(error.response.data);
        }
    }),
    cancelUserRequest: thunk(async (actions, payload: any) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().delete(`/request/${payload.id}`);
            if (response.data) {
                message.success("Request canceled");
                if (payload.user) actions.getUserRequests(payload.user);
                else if (payload.com) actions.getCommunityRequests(payload.com);
                actions.request({ isMembers: false, loader: false } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: false, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);
            // console.log(error.response.data);
        }
    }),

    validateCommunityRequest: thunk(async (actions, payload: any) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().post(
                `/request/approve/${payload.id}`
            );
            if (response.data) {
                message.success("Request validated");
                actions.request({ isMembers: false, loader: false } as any);
                actions.getCommunityRequests(payload.com);
                actions.getCommunityMembers(payload.com);
            }
        } catch (error: any) {
            actions.request({ isMembers: false, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);
            // console.log(error.response.data);
        }
    }),

    deleteCommunity: thunk(async (actions, payload: string) => {
        actions.request({ isMembers: false, loader: false } as any);
        actions.request({ isMembers: false, loader: true } as any);
        try {
            const response = await client().delete(`/community/${payload}`);
            if (response.data) {
                message.success("Community deleted");
                actions.getCommunities();
                actions.request({ isMembers: false, loader: false } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: false, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    getCommunityMembers: thunk(async (actions, payload) => {
        actions.request({ isMembers: true, loader: false } as any);
        actions.request({ isMembers: true, loader: true } as any);
        try {
            const response = await client().get(
                `/community/members/${payload}`
            );
            if (response.data) {
                actions.request({ isMembers: true, loader: false } as any);
                actions.success({
                    isMembers: true,
                    data: response.data,
                } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: true, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),

    deleteCommunityMember: thunk(async (actions, payload: any) => {
        actions.request({ isMembers: true, loader: false } as any);
        actions.request({ isMembers: true, loader: true } as any);
        try {
            const response = await client().delete(`/role/${payload.role}`);
            if (response.data) {
                message.success("Community member deleted");
                actions.getCommunityMembers(payload.community);
                actions.request({ isMembers: true, loader: false } as any);
            }
        } catch (error: any) {
            actions.request({ isMembers: true, loader: false } as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
};
