import { Action, Thunk } from "easy-peasy";

export interface UsersPayload {
    firstName: string;
    lastName: string;
    email: string;
    communities: string[];
}

export interface Users {
    loadingUsers: boolean;
    users: Array<any>;
    errors: any;
    roles: Array<any>;
    loadingRoles: boolean;

    request: Action<Users>;
    success: Action<Users>;
    failure: Action<Users>;
    getUsers: Thunk<Users>;
    registerUser: Thunk<Users, any>;
    deleteUser: Thunk<Users, string>;
    updateUserPassword: Thunk<Users, any>;

    addRole: Thunk<Users, any>;
    getRoles: Thunk<Users>;
    updateRole: Thunk<Users, any>;
}
