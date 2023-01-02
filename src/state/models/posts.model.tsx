import { thunk, action } from "easy-peasy";
import { Posts, PostsPayload } from "state/types";
import { client } from "config";

import { message, notification } from "antd";

// const success = () => {
//     message.success("Signed in successfully");
// };

const error = (error: any) => {
    if (error?.email) {
        switch (error?.email) {
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
            case "EMAIL_OR_PASSWORD_WRONG":
                message.error("Email or password wrong!");
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

export const PostsModel: Posts = {
    loadingPosts: false,
    loadingTags: false,
    post: {},
    posts: [],
    errors: {},
    tags: [],

    request: action((state, payload: any) => {
        if (payload.isTag) {
            return (state.loadingTags = payload.loader);
        } else return (state.loadingPosts = payload.loader);
    }),

    success: action((state, payload: any) => {
        if (payload.isTag) {
            return (state.tags = payload.data);
        }
        if (payload.isSinglePost) {
            return (state.post = payload.data);
        } else return (state.posts = payload.data);
        // return (state.loaderPosts = payload);
    }),
    failure: action((state, payload: any) => {
        if (payload !== null) {
            error(payload);
        } else message.error("Something went wrong, try again later");
        return (state.errors = payload);
    }),

    getPosts: thunk(async (actions) => {
        actions.request({ isTag: false, loader: false } as any);
        actions.request({ isTag: false, loader: true } as any);
        try {
            const response = await client().get(`/post`);
            if (response.data) {
                // console.log(response, "k");
                // // message.success('Profile photo updated');
                actions.request({ isTag: false, loader: false } as any);
                // // actions.getProfilePhoto((await response).data.filename)
                actions.success({ isTag: false, data: response.data } as any);
            }
        } catch (error: any) {
            actions.request({ isTag: false, loader: false } as any);
            // actions.success({ data: null, image: true } as any)
            // actions.failure(error?.response ? error?.response.data : null);

            // console.log(error?.response.data);
        }
    }),
    getPostById: thunk(async (actions, payload: string) => {
        actions.request({ isTag: false, loader: false } as any);
        actions.request({ isTag: false, loader: true } as any);
        try {
            const response = await client().get(`/post/${payload}`);
            if (response.data) {
                // console.log(response, "k");
                // // message.success('Profile photo updated');
                actions.request({ isTag: false, loader: false } as any);
                // // actions.getProfilePhoto((await response).data.filename)
                actions.success({
                    isSinglePost: false,
                    data: response.data,
                } as any);
            }
        } catch (error: any) {
            actions.request({ isTag: false, loader: false } as any);
            // actions.success({ data: null, image: true } as any)
            // actions.failure(error?.response ? error?.response.data : null);

            // console.log(error?.response.data);
        }
    }),
    setPost: action((state, payload: any) => {
        console.log(payload, "lkj");
        return (state.post = payload);
    }),
    registerPost: thunk(async (actions, payload: PostsPayload) => {
        actions.request({ isTag: false, loader: false } as any);
        actions.request({ isTag: false, loader: true } as any);
        try {
            const response = await client().post(`/post`, payload);
            if (response.data) {
                message.success("Post created");
                actions.getPosts();
                actions.request({ isTag: false, loader: false } as any);
            }
        } catch (error: any) {
            actions.request({ isTag: false, loader: false } as any);
            actions.failure(error?.response ? error?.response.data : null);

            console.log(error?.response.data);
        }
    }),
    deletePost: thunk(async (actions, payload: string) => {
        actions.request({ isTag: false, loader: false } as any);
        actions.request({ isTag: false, loader: true } as any);
        try {
            const response = await client().delete(`/post/${payload}`);
            if (response.data) {
                message.success("Post deleted");
                actions.getPosts();
                actions.request({ isTag: false, loader: false } as any);
            }
        } catch (error: any) {
            actions.request({ isTag: false, loader: false } as any);
            actions.failure(error?.response ? error?.response.data : null);

            console.log(error?.response.data);
        }
    }),
    registerTag: thunk(async (actions, payload: any) => {
        actions.request({ isTag: true, loader: false } as any);
        actions.request({ isTag: true, loader: true } as any);
        try {
            const response = await client().post(`/tag`, payload);
            if (response.data) {
                message.success("Tag created");
                actions.getTags();
                actions.request({ isTag: true, loader: false } as any);
            }
        } catch (error: any) {
            actions.request({ isTag: true, loader: false } as any);
            actions.failure(error?.response ? error?.response.data : null);

            console.log(error?.response.data);
        }
    }),
    getTags: thunk(async (actions) => {
        actions.request({ isTag: true, loader: false } as any);
        actions.request({ isTag: true, loader: true } as any);
        try {
            const response = await client().get(`/tag`);
            if (response.data) {
                // console.log(response, "k");
                // // message.success('Profile photo updated');
                actions.request({ isTag: true, loader: false } as any);
                // // actions.getProfilePhoto((await response).data.filename)
                actions.success({ isTag: true, data: response.data } as any);
            }
        } catch (error: any) {
            actions.request({ isTag: true, loader: false } as any);
            // actions.success({ data: null, image: true } as any)
            // actions.failure(error?.response ? error?.response.data : null);

            // console.log(error?.response.data);
        }
    }),
};
