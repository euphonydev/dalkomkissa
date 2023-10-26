export type Overwrite<Base, Overrides> = Omit<Base, keyof Overrides> & Overrides
export type Enum<T> = readonly T[]
export type StringEnum<T extends readonly string[]> = {
  [K in T[number]]: K
}
