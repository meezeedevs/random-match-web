import { AuthModel } from "./auth.model";
import { CommunitiesModel } from "./communities.model";
import { EventsModel } from "./events.model";
import { PostsModel } from "./posts.model";
import { UsersModel } from "./users.model";

export let models = {
    auth: AuthModel,
    users: UsersModel,
    communities: CommunitiesModel,
    events: EventsModel,
    posts: PostsModel,
};
