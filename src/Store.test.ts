import { createStore } from "./Store";
import { Action, Reducer } from "./types";

describe("createStore", () => {
  describe("public interface", () => {
    it("is a function", () => {
      expect(createStore).toBeInstanceOf(Function);
    });
    it("generates store with reducer", () => {
      const state = 2;
      const store = createStore(() => state);
      expect(store.getState).toBeInstanceOf(Function);

      expect(store.dispatch).toBeInstanceOf(Function);

      expect(store.subscribe).toBeInstanceOf(Function);
      expect(store.subscribe(jest.fn())).toBeInstanceOf(Function);
    });
  });

  describe("functional interface", () => {
    it("returns state based on initial state", () => {
      const state = { name: "Bob" };
      expect(createStore(() => null).getState()).toBe(undefined);
      expect(createStore(() => null, state).getState()).toBe(state);
    });

    it("calculates new state with reducer call", () => {
      const action1 = { type: "xxx" };
      const action2 = { type: "yyyy" };
      const reducer = jest.fn((state = 1) => state + 1);
      const store = createStore(reducer);
      store.dispatch(action1);
      expect(reducer).toHaveBeenCalledWith(undefined, action1);
      expect(store.getState()).toBe(2);
      store.dispatch(action2);
      expect(reducer).toHaveBeenCalledWith(2, action2);
      expect(store.getState()).toBe(3);
    });

    it("notifies listeners about updates", () => {
      const action1 = { type: "xxx" };
      const action2 = { type: "yyyy" };
      const reducer = jest.fn((state = 1) => state + 1);
      const store = createStore(reducer);
      const spy = jest.fn();
      store.subscribe(spy);
      expect(spy).not.toHaveBeenCalled();
      store.dispatch(action1);
      expect(spy).toHaveBeenCalled();
      store.dispatch(action2);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it("allows to unsubscribe from the events", () => {
      const action1 = { type: "xxx" };
      const action2 = { type: "yyyy" };
      const reducer = jest.fn((state = 1) => state + 1);
      const store = createStore(reducer);
      const spy = jest.fn();
      const unsubscribe = store.subscribe(spy);
      expect(spy).not.toHaveBeenCalled();
      store.dispatch(action1);
      expect(spy).toHaveBeenCalled();
      unsubscribe();
      store.dispatch(action2);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("test replaceReducer function", () => {
    const state = { name: "Bob" };
    const reducer: Reducer = jest.fn();
    const store = createStore(reducer, state);
    it("is a function", () => {
      expect(store.replaceReducer).toBeInstanceOf(Function);
    });
    it("replace old reducer", () => {
      const newReducer = jest.fn();
      const action: Action = {
        type: "action",
        payload: {
          name: "James",
        },
      };

      store.dispatch(action);
      expect(reducer).toHaveBeenCalledTimes(1);

      store.replaceReducer(newReducer);

      store.dispatch(action);
      expect(newReducer).toHaveBeenCalledTimes(1);
      expect(reducer).toHaveBeenCalledTimes(1);
    });
  });

  describe("middlewares", () => {
    it("using middlewares", () => {
      const state = { name: "Bob" };
      const reducer: Reducer = jest.fn();
      const middlewareFn = jest.fn();
      const middlewares = [middlewareFn];
      const store = createStore(reducer, state, middlewares);

      expect(store).not.toBeNull();
      expect(middlewareFn).toHaveBeenCalledTimes(1);
    });
  });
});
