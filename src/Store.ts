export type Store<State = any, Action = { type: string }> = {
  getState(): State;
  dispatch(action: Action): any;
  subscribe(cb: () => void): () => void;
};

export type Reducer<State, Action> = (
  state: State | undefined,
  action: Action
) => State;

export type Middleware<State, Action> = (
  store: Store<State, Action>
) => (next: (action: Action) => any) => (action: Action) => any;

export type CreateStore<State, Action> = (
  reducer: Reducer<State, Action>,
  initialState?: State | undefined,
  middlewares?: Middleware<State, Action>[]
) => Store<State, Action>;

export function createStore<State, Action>(
  reducer: Reducer<State, Action>,
  initialState?: State | undefined,
  middlewares?: Middleware<State, Action>[]
): Store {
  let state = initialState;
  let subscribers: any[] = [];
  return {
    getState() {
      return state;
    },
    dispatch(action: any) {
      state = reducer(state, action);
      subscribers.forEach((fn) => {
        fn();
      });
    },
    subscribe(cb: any): any {
      subscribers.push(cb);
      return () => {
        subscribers = subscribers.filter((fn) => {
          return fn !== cb;
        });
      };
    },
  };
}
