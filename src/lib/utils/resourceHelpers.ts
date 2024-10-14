// src/lib/utils/resourceHelpers.ts
import type { FetchResource } from '$lib/database/types';
import type { SortOption } from '$lib/types';

export function filterResources(
    resources: FetchResource[],
    searchQuery: string,
    selectedCategory: string,
    selectedEcosystem: string,
    selectedType: string,
    selectedTags: string[]
): FetchResource[] {
    return resources.filter((resource) => {
        const matchesSearch =
            searchQuery === '' ||
            resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === 'all' ||
            resource.category === selectedCategory;

        const matchesEcosystem =
            selectedEcosystem === 'all' ||
            resource.ecosystem === selectedEcosystem;

        const matchesType =
            selectedType === 'all' || resource.type === selectedType;

        const matchesTags =
            selectedTags.length === 0 ||
            selectedTags.every((tag) => resource.tags.includes(tag));

        return (
            matchesSearch &&
            matchesCategory &&
            matchesEcosystem &&
            matchesType &&
            matchesTags
        );
    });
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
