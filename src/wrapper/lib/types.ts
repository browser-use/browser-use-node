/**
 * Distributive Pick - does not collapse unions into a "shared type" only to
 * run Pick on it. Instead, it "picks" from each union item separately.
 *
 * See https://github.com/klimashkin/css-modules-theme/pull/8
 *
 * Example:
 *      Pick<{ type: "pick" } | { type: "omit" }, "type">
 *  produces { type: "pick" | "omit" }
 *
 * UnionPick<{ type: "pick" } | { type: "omit" }, "type">
 *  produces { type: "pick" } | { type: "omit" }
 */
export type UnionPick<T, K extends keyof T> = T extends unknown ? Pick<T, K> : never;

/**
 * Like UnionPick, but for Omit
 */
export type UnionOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

/**
 * Utility type for properties that may be undefined until loaded.
 */
export type Loadable<T> = ({ loading: true } & { [K in keyof T]?: never }) | ({ loading: false } & T);

/**
 * Utility type that removes null fields from a type.
 */
export type DeepRequired<T> = {
  [P in keyof T]: Exclude<T[P], null>;
};

/**
 * Makes a type check that is only valid when all cases of a switch
 * statement have been convered.
 */
export class ExhaustiveSwitchCheck extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${JSON.stringify(val)}`);
  }
}

/**
 * A utiliy type that lets you extract a union member by its `kind` property.
 *
 * @example
 *
 * type Shape =
 *   | { kind: 'circle'; radius: number }
 *   | { kind: 'square'; sideLength: number }
 *   | { kind: 'rectangle'; width: number; height: number };
 *
 * type Circle = ExtractKind<Shape, 'circle'>; // { kind: 'circle'; radius: number }
 */
export type ExtractKind<T, K> = T extends { kind: K } ? T : never;

/**
 * A utiliy type that lets you extract a union member by its `ok` property.
 *
 * @example
 *
 * type Result = { ok: true; value: string } | { ok: false; error: string };
 *
 * type Ok = ExtractResult<Result, true>; // { ok: true; value: string }
 */
export type ExtractResult<T, K extends boolean> = T extends { ok: K } ? T : never;

/**
 * Creates a deep readonly object mutable.
 */
export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};
