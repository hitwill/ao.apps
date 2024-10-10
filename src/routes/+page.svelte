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

    let resources: FetchResource[] = [];
    let searchQuery = writable('');
    let currentSort = writable(SORT_OPTIONS[0]);
    let selectedCategory = writable(CATEGORIES[0]);
    let selectedEcosystem = writable(ECOSYSTEMS[0]);
    let isLoading = writable(true);
    let page = 0;
    const ITEMS_PER_PAGE = 5;

    onMount(async () => {
        $isLoading = false;
    });

    async function fetchResources(
        infiniteLoadingEvent?: CustomEvent
    ): Promise<void> {
        const result = await databaseService.getResources(page, ITEMS_PER_PAGE);

        if (result.data && result.data.length > 0) {
            resources = [...resources, ...result.data];
            resources = sortResources(resources, $currentSort.value);

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

    $: filteredResources = filterResources(
        resources,
        $searchQuery,
        $selectedCategory.value,
        $selectedEcosystem.value
    );
    $: sortedResources = sortResources(filteredResources, $currentSort.value);

    $: {
        $searchQuery;
        $selectedCategory;
        $selectedEcosystem;
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
                <h1 class="text-4xl font-bold mb-2">AR / AO Cosmos</h1>
                <p class="text-xl text-gray-600">
                    Your gateway to apps, tools, and resources in the Arweave
                    and AO ecosystems
                </p>
            </div>
            <Button href="/register">Add Your Resource</Button>
        </div>
    </header>

    <SearchBar bind:searchQuery />

    <FilterBar
        bind:selectedEcosystem
        bind:selectedCategory
        bind:currentSort
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
            <Button href="/register">Add a Resource</Button>
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

<style>
    :global(body) {
        background-color: #f9fafb;
    }
</style>
