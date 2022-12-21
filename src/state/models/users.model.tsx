import { thunk, action } from "easy-peasy";
import { Users } from "state/types";
import { client } from "config";

import { message, notification } from "antd";

// const success = () => {
//     message.success("Signed in successfully");
// };

const error = (error: any) => {
    if (error?.user) {
        switch (error?.user) {
            case "ALREADY_HAVE_ACCESS":
                message.error("User is already in the community");
                break;
            case "USER_EXIST_NOT":
                message.error("user does not exist");
                break;
            case "user_EMPTY":
                message.error("You're trying to login with an empty user");
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
            case "user_OR_PASSWORD_WRONG":
                message.error("user or password wrong!");
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
                "Something went wrong, try again later and if it persist contact the IT team",
            duration: 0,
        });
};

export const UsersModel: Users = {
    loadingUsers: false,
    users: [],
    errors: {},
    loadingRoles: false,
    roles: [],

    request: action((state, payload: any) => {
        if (payload.isRole) {
            return (state.loadingRoles = payload.loading);
        } else return (state.loadingUsers = payload.loading);
        // return (state.loadingUsers = payload);
    }),

    success: action((state, payload: any) => {
        if (payload.isRole) {
            return (state.roles = payload.data);
        } else return (state.users = payload.data);
    }),
    failure: action((state, payload: any) => {
        if (payload !== null) {
            error(payload);
        } else message.error("Something went wrong, try again later");
        return (state.errors = payload);
    }),

    getUsers: thunk(async (actions) => {
        actions.request({ isRole: false, loading: false } as any);
        actions.request({ isRole: false, loading: true } as any);
        try {
            const response = await client().get(`/getUsers`);
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

    addRole: thunk(async (actions, payload: any) => {
        actions.request({ isRole: true, loading: true } as any as any);

        try {
            const response = await client().post(`/role`, payload);
            if (response.data.success) {
                message.success("Role assigned succesfully");
                actions.request({ isRole: true, loading: false } as any as any);
                actions.getUsers();
            }
        } catch (error: any) {
            actions.request({ isRole: true, loading: false } as any as any);
            actions.failure(error?.response ? error?.response.data : null);
            console.log(error?.response);
        }
    }),
    getRoles: thunk(async (actions) => {
        actions.request({ isRole: true, loading: false } as any as any);
        actions.request(true as any);
        try {
            const response = await client().get(`/role`);
            if (response.data) {
                // console.log(response, "k");
                // // message.success('Profile photo updated');
                actions.request({ isRole: true, loading: false } as any as any);
                // // actions.getProfilePhoto((await response).data.filename)
                actions.success({ isRole: true, data: response.data } as any);
            }
        } catch (error: any) {
            actions.request({ isRole: true, loading: false } as any as any);
            // actions.success({ data: null, image: true } as any)
            // actions.failure(error?.response ? error?.response.data : null);

            // console.log(error?.response.data);
        }
    }),
    updateRole: thunk(async (actions, payload: any) => {
        actions.request({ isRole: true, loading: true } as any as any);

        try {
            const response = await client().put(`/role/${payload.roleId}`, {
                role: payload.role,
            });
            if (response.data.success) {
                message.success("Role updated succesfully");
                actions.request({ isRole: true, loading: false } as any as any);
                actions.getUsers();
            }
        } catch (error: any) {
            actions.request({ isRole: true, loading: false } as any as any);
            actions.failure(error?.response ? error?.response.data : null);
            console.log(error?.response);
        }
    }),
};
