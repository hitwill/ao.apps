// src/lib/utils/resourceHelpers.ts
import type { FetchResource } from '$lib/database/types';
import type { SortOption } from '$lib/types';

export function filterResources(
    resources: FetchResource[],
    searchQuery: string,
    category: string,
    ecosystem: string
): Resource[] {
    return resources.filter((resource: Resource) => {
        const searchMatch =
            resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            resource.tags.toLowerCase().includes(searchQuery.toLowerCase());

        const categoryMatch = category === 'all' || resource.type === category;
        const ecosystemMatch =
            ecosystem === 'all' || resource.ecosystem === ecosystem;

        return searchMatch && categoryMatch && ecosystemMatch;
    });
}

export function sortResources(
    resources: FetchResource[],
    sortOption: SortOption['value']
): Resource[] {
    return [...resources].sort((a: Resource, b: Resource) => {
        if (sortOption === 'popular') {
            return (b.votes ?? 0) - (a.votes ?? 0);
        }
        if (sortOption === 'newest') {
            return (
                new Date(b.created_at || '').getTime() -
                new Date(a.created_at || '').getTime()
            );
        }
        if (sortOption === 'alphabetical') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });
}
