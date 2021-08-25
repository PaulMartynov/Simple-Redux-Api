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
