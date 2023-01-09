import { Action, Thunk } from "easy-peasy";

export interface EventsPayload {
    title: string;
    location: string;
    dueDate: string;
    organiser: string;
    description: string;
}

export interface Events {
    loading: boolean;
    events: Array<any>;
    upcomingEvents: Array<any>;
    errors: any;

    request: Action<Events>;
    success: Action<Events>;
    failure: Action<Events>;
    registerEvent: Thunk<Events, EventsPayload>;
    getEvents: Thunk<Events>;
    getUpcomingEvents: Thunk<Events>;
    deleteEvent: Thunk<Events, string>;
}
