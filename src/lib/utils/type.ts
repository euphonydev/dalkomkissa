export type Overwrite<Base, Overrides> = Omit<Base, keyof Overrides> & Overrides
export type Enum<T> = readonly T[]
