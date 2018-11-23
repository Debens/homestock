import { Action, ActionFunctionAny, ActionMeta } from 'redux-actions';

export interface IActionCreatorSpecParams<Params, Payload, Meta> {
    name: string;
    type: string;
    creator: ActionFunctionAny<Action<Payload> | ActionMeta<Payload, Meta>>;
    params?: Params;
    payload?: Payload;
    meta?: Meta;
}

export const actionCreatorSpec = <Params = void, Payload = Params, Meta = void>({
    name,
    type,
    creator,
    params,
    payload,
    meta,
}: IActionCreatorSpecParams<Params, Payload, Meta>): void => {
    describe(name, () => {
        const action = creator(params);

        it('should be an available action type', () => {
            expect(type).toEqual(name);
        });

        describe('when created', () => {
            it('should have the correct type', () => {
                expect(action.type).toEqual(type);
            });

            it(`should${payload === undefined ? ' not' : ''} have a payload`, () => {
                if (payload !== undefined) {
                    expect(action.payload).toEqual(payload);
                } else {
                    expect(action.payload).toBeUndefined();
                }
            });

            it(`should ${meta === undefined ? 'not' : ''} have a meta`, () => {
                const actionWithMeta = action as ActionMeta<Payload, Meta>;
                if (meta !== undefined) {
                    expect(actionWithMeta.meta).toEqual(meta);
                } else {
                    expect(actionWithMeta.meta).toBeUndefined();
                }
            });
        });
    });
};
