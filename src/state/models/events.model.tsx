import { thunk, action } from "easy-peasy";
import { Events, EventsPayload } from "state/types";
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

export const EventsModel: Events = {
    loading: false,
    events: [],
    errors: {},

    request: action((state, payload: any) => {
        return (state.loading = payload);
    }),

    success: action((state, payload: any) => {
        state.events = payload;
        // return (state.loading = payload);
    }),
    failure: action((state, payload: any) => {
        if (payload !== null) {
            error(payload);
        } else message.error("Something went wrong, try again later");
        return (state.errors = payload);
    }),

    registerEvent: thunk(async (actions, payload: EventsPayload) => {
        actions.request(false as any);
        actions.request(true as any);
        try {
            const response = await client().post(`/event`, payload);
            if (response.data) {
                message.success("Event created");
                actions.getEvents();
                actions.request(false as any);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
    getEvents: thunk(async (actions) => {
        actions.request(false as any);
        actions.request(true as any);
        try {
            const response = await client().get(`/event`);
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
    deleteEvent: thunk(async (actions, payload: string) => {
        actions.request(false as any);
        actions.request(true as any);
        try {
            const response = await client().delete(`/event/${payload}`);
            if (response.data) {
                message.success("Event deleted");
                actions.getEvents();
                actions.request(false as any);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);

            console.log(error.response.data);
        }
    }),
};
