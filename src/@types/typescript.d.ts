// Example interfaces:
//
//     interface A {
//         a: string,
//         b: string,
//         c: number;
//     }
//
//     interface B {
//         b: string,
//         c: string;
//     }

// Creates a new union type
// With all the commonly shared keys
// e.g. SharedKeys<A, B> = 'b' | 'c'
declare type SharedKeys<T, U> = Extract<keyof T, keyof U>;

// Creates a new type
// With all the commonly shared keys between T and U
// Where those key values share the same type
// e.g. TypeOverlap<A, B> = { b: string, c: number }
declare type Overlap<T, U> = Pick<T, SharedKeys<T, U>>;

// Creates a new union type
// With all the commonly shared keys
// Where the value types also match
// e.g. SharedTypedKeys<A, B> = 'b'
declare type SharedTypedKeys<T, U> = {
    [K in SharedKeys<T, U>]: U[K] extends T[K] ? K : never
}[SharedKeys<T, U>];

// Creates a new type
// With all the commonly shared keys between T and U
// Where those key values share the same type
// e.g. TypeOverlap<A, B> = { b: string }
declare type TypeOverlap<T, U> = Pick<T, SharedTypedKeys<T, U>>;

// Creates a new type
// With key K removed from type T
// e.g. Omit<A, 'b'> = { a: string, c: number }
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

// Creates a new type
// With all the overlapping keys U removed from T
// e.g. OmitOverlap<A, B> = { a: string }
type OmitOverlap<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
            ? ReadonlyArray<DeepPartial<U>>
            : DeepPartial<T[P]>
};

type Stringify<T> = { [k in keyof T]: string };
