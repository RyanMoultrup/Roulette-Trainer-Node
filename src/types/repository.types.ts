export type FindByIdFunction<T> = (id: string) => Promise<T | null>

export type All<T> = () => Promise<T[] | null>
