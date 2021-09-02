export type Action = { type: string; payload?: unknown };
export type State = any;
export type Listener = (state: State) => void;
export type Reducer = (state: State, action: Action) => State;

export type Store = {
  getState(): State | undefined;
  dispatch(action: Action): void;
  subscribe(cb: () => void): () => void;
  replaceReducer(newReducer: Reducer): void;
};

export type Middleware = (
  store: Store
) => (next: (action: Action) => any) => (action: Action) => any;

export type CreateStore = (
  reducer: Reducer,
  initialState?: State | undefined,
  middlewares?: Middleware[]
) => Store;
