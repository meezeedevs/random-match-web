import { StringGradients } from "antd/es/progress/progress";
import { Action, Thunk } from "easy-peasy";

export interface PostsPayload {
    title: string;
    description: string;
    status: string;
    author: any;
    content: string;
    image: any;
    video: StringGradients;
}

export interface Posts {
    loadingPosts: boolean;
    loadingTags: boolean;
    posts: Array<any>;
    errors: any;
    tags: Array<any>;

    request: Action<Posts>;
    success: Action<Posts>;
    failure: Action<Posts>;
    getPosts: Thunk<Posts>;
    registerPost: Thunk<Posts, PostsPayload>;
    deletePost: Thunk<Posts, string>;

    registerTag: Thunk<Posts, any>;
    getTags: Thunk<Posts>;
}
