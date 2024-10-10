<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';
    import {
        Select,
        SelectTrigger,
        SelectValue,
        SelectContent,
        SelectItem,
    } from '$lib/components/ui/select';
    import { Card } from '$lib/components/ui/card';
    import {
        ArrowUpCircle,
        Search,
        Sticker,
        Globe,
        Book,
        AlertTriangle,
        Layers,
    } from 'lucide-svelte';
    import { databaseService } from '$lib/database/DatabaseService';
    import type { Resource } from '$lib/database/types';
    import { writable } from 'svelte/store';

    interface SortOption {
        value: 'popular' | 'newest' | 'alphabetical';
        label: string;
    }

    const sortOptions: SortOption[] = [
        { value: 'popular', label: 'Most Popular' },
        { value: 'newest', label: 'Most Recent' },
        { value: 'alphabetical', label: 'Alphabetical' },
    ];

    let resources: Resource[] = [];
    let searchQuery = '';
    let currentSort = writable<SortOption>({
        value: 'popular',
        label: 'Most Popular',
    });

    type Selected<T> = {
        value: T;
        label: string;
    };

    let selectedCategory = writable<Selected<string>>({
        value: 'all',
        label: 'All Categories',
    });

    let selectedEcosystem = writable<Selected<string>>({
        value: 'all',
        label: 'All Ecosystems',
    });

    let isLoading = true;

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'app', label: 'Apps' },
        { value: 'website', label: 'Websites' },
        { value: 'library', label: 'Libraries' },
        { value: 'smart-contract', label: 'Smart Contracts' },
    ];

    const ecosystems = [
        { value: 'all', label: 'All Ecosystems' },
        { value: 'arweave', label: 'Arweave' },
        { value: 'ao', label: 'AO' },
    ];

    onMount(async () => {
        await fetchResources();
        isLoading = false;
    });

    async function fetchResources(): Promise<void> {
        const result = await databaseService.getResources();
        resources = result.data || [];
        sortResources();
    }

    function sortResources(): void {
        resources = resources.sort((a: Resource, b: Resource) => {
            const sortValue = $currentSort.value;
            if (sortValue === 'popular') {
                return (b.votes ?? 0) - (a.votes ?? 0);
            }
            if (sortValue === 'newest') {
                return (
                    new Date(b.created_at || '').getTime() -
                    new Date(a.created_at || '').getTime()
                );
            }
            if (sortValue === 'alphabetical') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });
    }

    function handleSearch(): void {
        resources = resources.filter(
            (resource: Resource) =>
                resource.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                resource.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                resource.tags.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    async function handleUpvote(id: number): Promise<void> {
        await databaseService.upvoteResource(id);
        await fetchResources();
    }

    function getResourceIcon(type: string) {
        switch (type) {
            case 'app':
                return Sticker;
            case 'website':
                return Globe;
            case 'library':
                return Book;
            case 'smart-contract':
                return Layers;
            default:
                return AlertTriangle;
        }
    }

    $: filteredResources = resources.filter((resource) => {
        const categoryMatch =
            $selectedCategory.value === 'all' ||
            resource.type === $selectedCategory.value;
        const ecosystemMatch =
            $selectedEcosystem.value === 'all' ||
            resource.ecosystem === $selectedEcosystem.value;
        return categoryMatch && ecosystemMatch;
    });
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

    <div class="mb-6">
        <div class="relative">
            <Input
                type="text"
                placeholder="Discover apps, tools, libraries, or smart contracts"
                bind:value={searchQuery}
                on:input={handleSearch}
                class="pr-10"
            />
            <Search
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
            />
        </div>
        <p class="text-sm text-gray-500 mt-2">
            Pro tip: Use tags or ecosystem names to refine your search
        </p>
    </div>

    <div class="flex justify-between items-center mb-6">
        <Select bind:selected={$selectedEcosystem}>
            <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Select ecosystem" />
            </SelectTrigger>
            <SelectContent>
                {#each ecosystems as ecosystem}
                    <SelectItem value={ecosystem.value}
                        >{ecosystem.label}</SelectItem
                    >
                {/each}
            </SelectContent>
        </Select>

        <Select bind:selected={$selectedCategory}>
            <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
                {#each categories as category}
                    <SelectItem value={category.value}
                        >{category.label}</SelectItem
                    >
                {/each}
            </SelectContent>
        </Select>

        <Select bind:selected={$currentSort} on:select={sortResources}>
            <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                {#each sortOptions as option}
                    <SelectItem value={option}>{option.label}</SelectItem>
                {/each}
            </SelectContent>
        </Select>
    </div>

    {#if isLoading}
        <div class="space-y-4">
            {#each Array(5) as _}
                <Card class="p-4 animate-pulse">
                    <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                </Card>
            {/each}
        </div>
    {:else if filteredResources.length === 0}
        <div class="text-center py-8">
            <p class="text-xl mb-4">
                No resources found. Try broadening your search or be the first
                to add a resource in this category!
            </p>
            <Button href="/register">Add a Resource</Button>
        </div>
    {:else}
        <div class="space-y-4">
            {#each filteredResources as resource (resource.id)}
                <Card
                    class="p-4 hover:shadow-lg transition-shadow duration-200"
                >
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="flex items-center mb-2">
                                <svelte:component
                                    this={getResourceIcon(resource.type)}
                                    size={20}
                                    class="mr-2"
                                />
                                <h3 class="text-xl font-semibold">
                                    {resource.name}
                                </h3>
                                <span class="ml-2 text-sm text-gray-500"
                                    >{resource.ecosystem}</span
                                >
                            </div>
                            <p class="text-gray-600 mb-2">
                                {resource.description}
                            </p>
                            <div class="flex flex-wrap gap-2">
                                {#each resource.tags.split(',') as tag}
                                    <span
                                        class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
                                        >{tag.trim()}</span
                                    >
                                {/each}
                            </div>
                        </div>
                        <div class="flex flex-col items-end">
                            <Button
                                variant="ghost"
                                on:click={() =>
                                    resource.id !== undefined &&
                                    handleUpvote(resource.id)}
                                class="flex items-center mb-2"
                                aria-label="Upvote this resource"
                            >
                                <ArrowUpCircle class="mr-1" size={16} />
                                {resource.votes}
                            </Button>
                            <Button
                                variant="outline"
                                href={`/details/${resource.id}`}
                                class="text-sm"
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                </Card>
            {/each}
        </div>
    {/if}

    <div class="mt-8 text-center">
        <Button variant="outline" class="mx-auto">Load More</Button>
    </div>
</main>

<style>
    :global(body) {
        background-color: #f9fafb;
    }
</style>
