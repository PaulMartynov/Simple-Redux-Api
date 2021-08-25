import { Reducer, State, Action, Listener } from "./types";

class Store {
  private state: State | undefined;

  private reducer: Reducer;

  private subscribers: Set<Listener>;

  constructor(reducer: Reducer, initialState?: State | undefined) {
    this.state = initialState;
    this.reducer = reducer;
    this.subscribers = new Set();
  }

  getState(): State | undefined {
    return this.state;
  }

  dispatch(action: Action): void {
    this.state = this.reducer(this.state, action);
    this.subscribers.forEach((fn) => {
      fn(this.state);
    });
  }

  subscribe(cb: () => void): () => void {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  replaceReducer(newReducer: Reducer): void {
    this.reducer = newReducer;
  }
}

export function createStore(
  reducer: Reducer,
  initialState?: State | undefined,
  middlewares?: any[]
): Store {
  let store = new Store(reducer, initialState);
  if (middlewares) {
    middlewares.forEach((middleware) => {
      store = middleware(store);
    });
  }
  return store;
}
