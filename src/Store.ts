import { Reducer, State, Store, Action, Listener } from "./types";

export function createStore(
  reducer: Reducer,
  initialState?: State | undefined
): Store {
  let state = initialState;
  const subscribers: Set<Listener> = new Set();
  let storeReducer = reducer;
  return {
    getState(): State | undefined {
      return state;
    },
    dispatch(action: Action) {
      state = storeReducer(state, action);
      subscribers.forEach((fn) => {
        fn(state);
      });
    },
    subscribe(cb: () => void): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    replaceReducer(newReducer: Reducer): void {
      storeReducer = newReducer;
    },
  };
}
