import { thunk, action } from "easy-peasy";
import { Members } from "state/types";
import { client } from "config";

import { message, notification } from "antd";

// const success = () => {
//     message.success("Signed in successfully");
// };

const error = (error: any) => {
    if (error?.members) {
        switch (error?.members) {
            case "ALREADY_HAVE_ACCESS":
                message.error("Members is already in the community");
                break;
            case "Members_EXIST_NOT":
                message.error("Members does not exist");
                break;
            case "Members_EMPTY":
                message.error("You're trying to login with an empty Members");
                break;
            default:
                message.error("Something went wrong, try again later");
                break;
        }
    } else if (error?.password) {
        switch (error?.password) {
            case "PASSWORD_WRONG":
                message.error("Wrong password");
                break;
            case "PASSWORD_MIN6_MAX30":
                message.error("Password must have characters between 6 and 30");
                break;
            case "PASSWORD_EMPTY":
                message.error("You're trying to login with an empty password");
                break;
            case "Members_OR_PASSWORD_WRONG":
                message.error("Members or password wrong!");
                break;
            default:
                message.error("Something went wrong, try again later");
                break;
        }
    } else if (error?.oldPassword) {
        switch (error?.oldPassword) {
            case "OLDPASSWORD_WRONG":
                message.error("Wrong old password");
                break;
            case "OLDPASSWORD_EMPTY":
                message.error("Old password not provided");
                break;
            default:
                message.error("Something went wrong, try again later");
                break;
        }
    } else if (error?.newPassword) {
        switch (error?.newPassword) {
            case "NEWPASSWORD_MIN6_MAX30":
                message.error(
                    "Your new password must have characters between 6 and 30"
                );
                break;
            case "NEWPASSWORD_EMPTY":
                message.error(
                    "You're trying to update with an empty new password "
                );
                break;
            case "NEWPASSWORD_DIFFERENT":
                message.error("new password and confirm password don't match");
                break;
            default:
                message.error("Something went wrong, try again later");
                break;
        }
    } else if (error?.newPassword2) {
        switch (error?.newPassword) {
            case "NEWPASSWORD2_EMPTY":
                message.error("Confirm password is empty");
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
                "Something went wrong, try again later and if it persist Members the IT team",
            duration: 0,
        });
};

export const MembersModel: Members = {
    loadingMembers: false,
    members: [],
    errors: {},

    request: action((state, payload: any) => {
        return (state.loadingMembers = payload.loading);
        // return (state.loadingMembers = payload);
    }),

    success: action((state, payload: any) => {
        return (state.members = payload.data);
    }),
    failure: action((state, payload: any) => {
        if (payload !== null) {
            error(payload);
        } else message.error("Something went wrong, try again later");
        return (state.errors = payload);
    }),

    getMembers: thunk(async (actions) => {
        actions.request({ isRole: false, loading: false } as any);
        actions.request({ isRole: false, loading: true } as any);
        try {
            const response = await client().get(`/users`);
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

    registerMember: thunk(async (actions, payload: any) => {
        actions.request({ isRole: false, loading: false } as any);
        actions.request({ isRole: false, loading: true } as any);

        try {
            const response = await client().post("/createUser", payload);

            if (response.data) {
                await actions.getMembers();
                message.success("Members added successfully");
                actions.request({ isRole: false, loading: false } as any);
            }
        } catch (error: any) {
            actions.request({ isRole: false, loading: false } as any);
            actions.failure(
                error ? (error?.response ? error?.response.data : null) : null
            );
        }
    }),

    deleteMember: thunk(async (actions, payload: string) => {
        actions.request({ isRole: false, loading: false } as any);
        actions.request({ isRole: false, loading: true } as any);
        console.log(payload)
        try {
            const response = await client().delete(`/members/${payload}`);
            if (response.data) {
                message.success("Members deleted");
                actions.getMembers();
                actions.request({ isRole: false, loading: false } as any);
            }
        } catch (error: any) {
            actions.request({ isRole: false, loading: false } as any);
            actions.failure(error?.response ? error?.response.data : null);

            console.log(error?.response.data);
        }
    }),

    updateMember: thunk(async (actions, payload: any) => {
        actions.request({ isRole: false, loading: false } as any);
        actions.request({ isRole: false, loading: true } as any);

        try {
            const response = await client().put("/members", payload);

            if (response.data.success) {
                await actions.getMembers();
                message.success("Members updated successfully");
                actions.request({ isRole: false, loading: false } as any);
            }
        } catch (error: any) {
            actions.request({ isRole: false, loading: false } as any);
            actions.failure(
                error ? (error?.response ? error?.response.data : null) : null
            );
        }
    }),
};
