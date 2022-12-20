import { CommunitiesModel } from 'state/models/communities.model';
import { AuthModel } from 'state/models/auth.model';
import { UsersModel } from 'state/models/users.model';
import { EventsModel } from 'state/models/events.model';
import { PostsModel } from 'state/models/posts.model';

export interface Store {
    auth: typeof AuthModel;
    users: typeof UsersModel;
    communities: typeof CommunitiesModel
    events: typeof EventsModel
    posts: typeof PostsModel,
}
