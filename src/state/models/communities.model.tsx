import { thunk, action } from "easy-peasy";
import { Communities, CommunitiesPayload } from "state/types";
import { client } from "config";

import { message, notification } from "antd";

// const success = () => {
//     message.success("Signed in successfully");
// };

const error = (error: any) => {
    if (error.name) {
        switch (error.name) {
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
    } else if (error.message) {
        switch (error.message) {
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
    errors: {},

    request: action((state, payload: any) => {
        return (state.loading = payload);
    }),

    success: action((state, payload: any) => {
        state.communities = payload;
        // return (state.loading = payload);
    }),
    failure: action((state, payload: any) => {
        if (payload !== null) {
            error(payload);
        } else message.error("Something went wrong, try again later");
        return (state.errors = payload);
    }),

    registerCommunity: thunk(async (actions, payload: CommunitiesPayload) => {
        actions.request(false as any);
        actions.request(true as any);
        try {
            const response = await client().post(`/community`, payload);
            if (response.data) {
                message.success("Community created");
                actions.getCommunities();
                actions.request(false as any);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    getCommunities: thunk(async (actions) => {
        actions.request(false as any);
        actions.request(true as any);
        try {
            const response = await client().get(`/community`);
            if (response.data) {
                actions.request(false as any);
                actions.success(response.data as any);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    deleteCommunity: thunk(async (actions, payload: string) => {
        actions.request(false as any);
        actions.request(true as any);
        try {
            const response = await client().delete(`/community/${payload}`);
            if (response.data) {
                message.success("Community deleted");
                actions.getCommunities();
                actions.request(false as any);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
};
