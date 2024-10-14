<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { databaseService } from '$lib/database/DatabaseService';
    import type { FetchResource } from '$lib/database/types';
    import { SORT_OPTIONS, CATEGORIES, ECOSYSTEMS } from '$lib/constants';
    import { filterResources, sortResources } from '$lib/utils/resourceHelpers';
    import ResourceCard from '$lib/components/ResourceCard.svelte';
    import FilterBar from '$lib/components/FilterBar.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import ResourceSkeletons from '$lib/components/ResourceSkeletons.svelte';
    import { Button } from '$lib/components/ui/button';
    import InfiniteLoading from 'svelte-infinite-loading';
    import AddResourceModal from '$lib/components/AddResourceModal.svelte';
    import { splitTags, joinTags } from '$lib/utils/tagHelpers';

    let resources: FetchResource[] = [];
    let searchQuery = writable('');
    let currentSort = writable(SORT_OPTIONS[0]);
    let selectedCategory = writable(CATEGORIES[0]);
    let selectedEcosystem = writable(ECOSYSTEMS[0]);
    let selectedTags = writable<string[]>([]);
    let isLoading = writable(true);
    let page = 0;
    let isModalOpen = false;

    const ITEMS_PER_PAGE = 10;

    onMount(async () => {
        $isLoading = false;
    });

    async function fetchResources(
        infiniteLoadingEvent?: CustomEvent
    ): Promise<void> {
        const sortMapping = {
            popular: { field: 'votes', direction: 'DESC' },
            newest: { field: 'created_at', direction: 'DESC' },
            alphabetical: { field: 'name', direction: 'ASC' },
        };

        const sortOption =
            sortMapping[$currentSort.value] || sortMapping.popular;

        const result = await databaseService.getResources(
            page,
            ITEMS_PER_PAGE,
            {
                category: $selectedCategory.value,
                ecosystem: $selectedEcosystem.value,
                tags: $selectedTags,
                search: $searchQuery,
            },
            {
                field: sortOption.field,
                direction: sortOption.direction as 'ASC' | 'DESC',
            }
        );

        if (result.data && result.data.length > 0) {
            resources = [...resources, ...result.data];

            if (infiniteLoadingEvent) {
                page++;
                infiniteLoadingEvent.detail.loaded();
                if (result.data.length < ITEMS_PER_PAGE) {
                    infiniteLoadingEvent.detail.complete();
                }
            }
        } else {
            if (infiniteLoadingEvent) {
                infiniteLoadingEvent.detail.complete();
            }
        }
    }

    async function handleUpvote(id: number): Promise<void> {
        await databaseService.upvoteResource(id);
        resources = resources.map((r) =>
            r.id === id ? { ...r, votes: (r.votes || 0) + 1 } : r
        );
        resources = sortResources(resources, $currentSort.value);
    }

    function resetResources() {
        resources = [];
        page = 0;
        fetchResources();
    }

    function handleResourceAdded(event: CustomEvent) {
        const newResource = event.detail;
        // Ensure tags are in the correct format
        newResource.tags = joinTags(newResource.tags);
        resources = [newResource, ...resources];
        resources = sortResources(resources, $currentSort.value);
    }

    $: filteredResources = filterResources(
        resources,
        $searchQuery,
        $selectedCategory.value,
        $selectedEcosystem.value,
        $selectedTags
    );
    $: sortedResources = sortResources(filteredResources, $currentSort.value);

    $: {
        $searchQuery;
        $selectedCategory;
        $selectedEcosystem;
        $selectedTags;
        $currentSort;
        resetResources();
    }
</script>

<svelte:head>
    <title>Discover Arweave & AO Ecosystems | Resource Directory</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
    <header class="mb-8">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-4xl font-bold mb-2">
                    Search the Arweave and AO Ecosystem
                </h1>
                <p class="text-xl text-gray-600">
                    Your gateway to apps, tools, and resources in the Arweave
                    and AO ecosystems
                </p>
            </div>
            <Button on:click={() => (isModalOpen = true)}
                >Add Your Resource</Button
            >
        </div>
    </header>

    <SearchBar bind:searchQuery />

    <FilterBar
        bind:selectedEcosystem
        bind:selectedCategory
        bind:currentSort
        bind:selectedTags
        on:sort={resetResources}
    />

    {#if $isLoading}
        <ResourceSkeletons count={5} />
    {:else if sortedResources.length === 0}
        <div class="text-center py-8">
            <p class="text-xl mb-4">
                No resources found. Try broadening your search or be the first
                to add a resource in this category!
            </p>
            <Button on:click={() => (isModalOpen = true)}>Add a Resource</Button
            >
        </div>
    {:else}
        <div class="space-y-4">
            {#each sortedResources as resource (resource.id)}
                <ResourceCard
                    {resource}
                    on:upvote={() => handleUpvote(resource.id)}
                />
            {/each}
        </div>
        <InfiniteLoading on:infinite={fetchResources} />
    {/if}
</main>

<AddResourceModal
    bind:open={isModalOpen}
    on:resourceAdded={handleResourceAdded}
/>

<style>
    :global(body) {
        background-color: #f9fafb;
    }
</style>
