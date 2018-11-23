import { List } from 'immutable';

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends List<infer U>
        ? List<DeepPartial<U>>
        : T[P] extends Map<infer A, infer B> ? Map<A, DeepPartial<B>> : DeepPartial<T[P]>
};
