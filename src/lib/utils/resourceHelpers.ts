// src/lib/utils/resourceHelpers.ts
import type { FetchResource } from '$lib/database/types';
import type { SortOption } from '$lib/types';

export function filterResources(
    resources: FetchResource[],
    searchQuery: string,
    category: string,
    ecosystem: string,
    tags: string[]
): FetchResource[] {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredResources = resources.filter((resource: FetchResource) => {
        const searchMatch =
            resource.name.toLowerCase().includes(lowercaseQuery) ||
            resource.description.toLowerCase().includes(lowercaseQuery);
        const tagMatch =
            tags.length === 0 ||
            tags.some((tag) => resource.tags.includes(tag));

        const categoryMatch =
            category === 'all' || resource.category === category;
        const ecosystemMatch =
            ecosystem === 'all' || resource.ecosystem === ecosystem;
        return searchMatch && categoryMatch && ecosystemMatch && tagMatch;
    });

    // Ensure uniqueness based on id
    return Array.from(
        new Map(filteredResources.map((r) => [r.id, r])).values()
    );
}

export function sortResources(
    resources: FetchResource[],
    sortOption: SortOption['value']
): FetchResource[] {
    const sortedResources = [...resources].sort(
        (a: FetchResource, b: FetchResource) => {
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
        }
    );

    // Ensure uniqueness based on id
    return Array.from(new Map(sortedResources.map((r) => [r.id, r])).values());
}
