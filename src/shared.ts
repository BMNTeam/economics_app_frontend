export interface ActionPayload<T> {
  type: string;
  payload?: T;
}

export const defineClassName = (names: string, add: string, shouldAdd: () => boolean) => {
  return shouldAdd() ? names + " " + add : names;
};