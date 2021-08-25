import { compose } from "./compose";

describe("testing compose function", () => {
  test("is a function", () => {
    expect(compose).toBeInstanceOf(Function);
  });
  test("must return array if args empty", () => {
    expect(compose([])).toStrictEqual([]);
  });
  test("must return function if zero args", () => {
    expect(compose()).toBeInstanceOf(Function);
  });
});
