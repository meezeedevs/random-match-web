import { Action, Thunk } from "easy-peasy";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface Login {
    token: string;
    loading: boolean;
    user: any;
    errors: any;

    request: Action<Login>;
    success: Action<Login>;
    failure: Action<Login>;
    login: Thunk<Login, LoginPayload>;
    signup: Thunk<Login, any>;
    logout: Action<Login>;

    updateUserData: Thunk<Login, any>;
    updateUserCredentials: Thunk<Login, any>;
    updateUserHandle: Thunk<Login, any>;
    uploadPhoto: Thunk<Login, any>;
    getProfilePhoto: Thunk<Login>;

    forgotPassword: Thunk<Login, any>;
    resetPassword: Thunk<Login, any>;
}
