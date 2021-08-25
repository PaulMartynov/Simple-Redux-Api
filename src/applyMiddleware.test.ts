import { applyMiddleware } from "./applyMiddleware";
import { State } from "./types";

describe("testing applyMiddleware function", () => {
  test("is a function type", () => {
    expect(applyMiddleware).toBeInstanceOf(Function);
  });

  test("is return function", () => {
    expect(applyMiddleware(jest.fn(), jest.fn())).toBeInstanceOf(Function);
  });

  test("it is call middleware functions", () => {
    const reducer = jest.fn();
    const state: State = {};
    const middleware1 = jest.fn().mockReturnValue(jest.fn());
    const middleware2 = jest.fn().mockReturnValue(jest.fn());

    const initMiddleware = applyMiddleware(middleware1, middleware2);
    const createStoreFunc = jest.fn().mockReturnValue({
      dispatch: jest.fn(),
    });

    const store = initMiddleware(createStoreFunc);
    store(reducer, state);
    expect(middleware1).toBeCalledTimes(1);
    expect(middleware2).toBeCalledTimes(1);
  });
});
