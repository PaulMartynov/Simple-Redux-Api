import { Action, CreateStore, Reducer, State, Store } from "./types";
import { compose } from "./compose";

export function applyMiddleware(...middlewares: any[]) {
  return (createStore: CreateStore) => {
    return (
      reducer: Reducer,
      state: State
    ): {
      dispatch: (action: Action) => any;
      getState: () => State | undefined;
    } => {
      const store: Store = createStore(reducer, state);
      let { dispatch } = store;

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action: Action) => dispatch(action),
      };

      const chain = middlewares.map((fn) => fn(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
  };
}
