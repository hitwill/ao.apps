// src/lib/types.ts
export interface SortOption {
    value: 'popular' | 'newest' | 'alphabetical';
    label: string;
}

export interface Selected<T> {
    value: T;
    label: string;
}
