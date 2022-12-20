import { createStore, persist } from 'easy-peasy';
import { models } from './models';

export const store = createStore(persist(models));
