import { Action, Reducer, State } from "./types";

export function combineReducers(
  config: Record<string, Reducer>
): (state: State, action: Action) => Record<string, unknown> {
  return (state: State, action: Action) => {
    const newState: Record<string, unknown> = {};
    Object.keys(config).forEach((key) => {
      newState[key] = config[key](state ? state[key] : undefined, action);
    });
    return newState;
  };
}
