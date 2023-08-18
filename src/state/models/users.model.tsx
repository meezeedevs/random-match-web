import { thunk, action } from "easy-peasy";
import { Users } from "state/types";
import { client } from "config";

import { message } from "antd";

// const success = () => {
//     message.success("Signed in successfully");
// };

const error = (error: any) => {
}

export const UserModel: Users = {
    loadingUnmatched: false,
    unmatched: [],
    errors: {},

    request: action((state, payload: any) => {
        return (state.loadingUnmatched = payload.loading);
        // return (state.loadingUser = payload);
    }),

    success: action((state, payload: any) => {
        return (state.unmatched = payload.data);
    }),
    failure: action((state, payload: any) => {
        if (payload !== null) {
            error(payload);
        } else message.error("Something went wrong, try again later");
        return (state.errors = payload);
    }),

    getUnmatched: thunk(async (actions) => {
        actions.request({ isRole: false, loading: false } as any);
        actions.request({ isRole: false, loading: true } as any);
        try {
            const response = await client().get(`/getUnmatched`);
            if (response.data) {
                // console.log(response, "k");
                // // message.success('Profile photo updated');
                actions.request({ isRole: false, loading: false } as any);
                // // actions.getProfilePhoto((await response).data.filename)
                actions.success({ isRole: false, data: response.data } as any);
            }
        } catch (error: any) {
            actions.request({ isRole: false, loading: false } as any);
            // actions.success({ data: null, image: true } as any)
            // actions.failure(error?.response ? error?.response.data : null);

            // console.log(error?.response.data);
        }
    }),

    sendMatch: thunk(async (actions, payload: any) => {
        actions.request({ isRole: false, loading: false } as any);
        actions.request({ isRole: false, loading: true } as any);

        try {
            const response = await client().post("/message", payload);

            if (response.data) {
                await actions.getUnmatched();
                message.success("Message sent");
                actions.request({ isRole: false, loading: false } as any);
            }
        } catch (error: any) {
            actions.request({ isRole: false, loading: false } as any);
            actions.failure(
                error ? (error?.response ? error?.response.data : null) : null
            );
        }
    })
};
