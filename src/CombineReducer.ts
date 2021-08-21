type CombineReducer<ReducersConfig = any, Action = { type: any }> = (
  config: {
    [key in keyof ReducersConfig]: (
      state: ReducersConfig[key] | undefined,
      action: Action
    ) => ReducersConfig[key];
  }
) => (
  state:
    | {
        [key in keyof ReducersConfig]: ReducersConfig[key];
      }
    | undefined,
  action: Action
) => {
  [key in keyof ReducersConfig]: ReducersConfig[key];
};
// put your code here
export const combineReducers: CombineReducer = (config) => {
  return (state, action) => {
    const newState = {};
    Object.keys(config).forEach((key) => {
      // @ts-ignore
      newState[key] = config[key](state ? state[key] : undefined, action);
    });
    return newState;
  };
};
