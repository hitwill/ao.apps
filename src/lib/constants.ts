// src/lib/constants.ts
import type { SortOption, Selected } from './types';

export const SORT_OPTIONS: SortOption[] = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Most Recent' },
    { value: 'alphabetical', label: 'Alphabetical' },
];

export const CATEGORIES: Selected<string>[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'app', label: 'Apps' },
    { value: 'website', label: 'Websites' },
    { value: 'library', label: 'Libraries' },
    { value: 'smart-contract', label: 'Smart Contracts' },
];

export const ECOSYSTEMS: Selected<string>[] = [
    { value: 'all', label: 'All Ecosystems' },
    { value: 'arweave', label: 'Arweave' },
    { value: 'ao', label: 'AO' },
];
