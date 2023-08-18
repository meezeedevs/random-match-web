import { AuthModel } from 'state/models/auth.model';
import { MembersModel } from 'state/models/members.model';
import { UserModel } from 'state/models/users.model';

export interface Store {
    auth: typeof AuthModel;
    members: typeof MembersModel;
    users: typeof UserModel
}