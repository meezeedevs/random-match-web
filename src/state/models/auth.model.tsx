import { thunk, action } from "easy-peasy";
import { Login, LoginPayload } from "state/types";
import { client, routes, setAuthToken } from "config";
import jwt_decode from "jwt-decode";

import { message, notification } from "antd";
import { storage, redirectTo } from "utils";

const success = () => {
    message.success("Signed in successfully");
};

const error = (error: any) => {
    if (error.email) {
        switch (error.email) {
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
    } else if (error.password) {
        switch (error.password) {
            case "PASSWORD_WRONG":
                message.error("Wrong password");
                break;
            case "PASSWORD_MIN6_MAX30":
                message.error("Password must have characters between 6 and 30");
                break;
            case "PASSWORD_EMPTY":
                message.error("You're trying to login with an empty password");
                break;
            case "EMAIL_OR_PASSWORD_WRONG":
                message.error("Email or password wrong!");
                break;
            default:
                message.error("Something went wrong, try again later");
                break;
        }
    } else if (error.oldPassword) {
        switch (error.oldPassword) {
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
    } else if (error.newPassword) {
        switch (error.newPassword) {
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
    } else if (error.newPassword2) {
        switch (error.newPassword) {
            case "NEWPASSWORD2_EMPTY":
                message.error("Confirm password is empty");
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

export const AuthModel: Login = {
    token: "",
    loading: false,
    user: {},
    errors: {},

    request: action((state, payload: any) => {
        return (state.loading = payload);
    }),

    success: action((state, payload: any) => {
        if (payload.image) {
            const data = {
                ...state.user,
                image: payload.data,
            };
            console.log(data);
            state.user = data;
        } else {
            if (payload.new) {
                success();
            }
            state.token = payload.token;
            state.user = payload.user;
            // return (state.loading = payload);
        }
    }),
    failure: action((state, payload: any) => {
        if (payload.image) {
            const data = {
                ...state.user,
            };
            state.user = data;
            return (state.errors = payload.data);
        } else if (payload !== null) {
            error(payload);
        } else message.error("Something went wrong, try again later");
        return (state.errors = payload);
    }),

    login: thunk(async (actions, payload: LoginPayload) => {
        actions.request(true as any);

        try {
            const response = await client().post("/login", payload);

            const { token } = response.data;

            storage.save("jwtToken", token);

            // we decode the token so that we can extract user data
            const decoded: any = jwt_decode(token);

            storage.save("currentUser", decoded);

            setAuthToken(token);

            message.loading("Checking creadentials...", 1).then(() => {
                actions.request(false as any);
                message.success("Creadentials validated!", 1.2);
                actions.success({
                    user: decoded,
                    token: token,
                    new: true,
                } as any);
                message.success(`Welcome ${decoded.username}`);
                redirectTo(routes.dashboard);
                // window.location.href = "/admin/dashboard";
                // if (decoded.isInactive) {
                //     window.location.href = "/app/settings";
                // } else window.location.href = "admin/dashboard";
            });
            // redirectTo(routes.board);
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);
            // console.log(error.response.data);
        }
    }),
    logout: action((state) => {
        try {
            state.loading = false;
            storage.remove();
            message.success("Signed out successfully");
            setAuthToken("");
            state.token = "";
            state.user = {};
            redirectTo(routes.login);
            // window.location.href = "/auth/login";
        } catch (error: any) {
            message.error("Sorry but something went wrong, try again later");
        }
    }),

    forgotPassword: thunk(async (actions, payload: any) => {
        actions.request(true as any);

        try {
            const response = await client().post("/forgot/password", payload);
            if (response.data.success) {
                message.success("Message sent! Check Your mail inbox");
                actions.request(false as any);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);
            // console.log(error.response.data);
        }
    }),

    updateUserData: thunk(async (actions, payload: any) => {
        actions.request(true as any);

        try {
            const response = await client().post("/account/profile", payload);

            if (response.data.success) {
                message.success("Your identity has been updated");
                actions.request(false as any);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);
            // console.log(error.response.data);
        }
    }),
    updateUserCredentials: thunk(async (actions, payload: any) => {
        actions.request(true as any);

        try {
            const response = await client().post("/account/password", payload);

            if (response.data.success) {
                message.success("Credentials updated");
                actions.request(false as any);
                actions.logout();
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);
            // console.log(error.response.data);
        }
    }),
    updateUserHandle: thunk(async (actions, payload: any) => {
        actions.request(true as any);

        try {
            const response = await client().post(
                "/account/profile/color",
                payload
            );

            if (response.data.success) {
                message.success("Handle color updated");
                actions.request(false as any);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);
            // console.log(error.response.data);
        }
    }),

    uploadPhoto: thunk(async (actions, payload: any) => {
        actions.request(false as any);
        actions.request(true as any);
        try {
            console.log(payload, "responseeeee");
            const response = client().post("/profileImage", payload);
            console.log(response);

            if ((await response).data.success) {
                message.success("Profile photo updated");
                actions.request(false as any);
                actions.getProfilePhoto((await response).data.filename);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(
                error.response
                    ? ({ data: error.response.data, image: "" } as any)
                    : null
            );
            // console.log(error.response.data);
        }
    }),

    getProfilePhoto: thunk(async (actions) => {
        actions.request(false as any);
        actions.request(true as any);
        try {
            const response = await client().get(`/image`);
            if ((await response).data.filename) {
                // message.success('Profile photo updated');
                actions.request(false as any);
                // actions.getProfilePhoto((await response).data.filename)
                actions.success({
                    data: response.data.filename,
                    image: true,
                } as any);
            }
        } catch (error: any) {
            actions.request(false as any);
            // actions.success({ data: null, image: true } as any)
            // actions.failure(error.response ? error.response.data : null);

            // console.log(error.response.data);
        }
    }),

    resetPassword: thunk(async (actions, payload: any) => {
        actions.request(true as any);

        try {
            const response = await client().post(
                `/reset/${payload.token}`,
                payload.data
            );
            if (response.data.success) {
                message.success("Account recovered, Welcome back!");
                actions.request(false as any);
                redirectTo(routes.login);
            }
        } catch (error: any) {
            actions.request(false as any);
            actions.failure(error.response ? error.response.data : null);
            console.log(error.response);
        }
    }),
};
