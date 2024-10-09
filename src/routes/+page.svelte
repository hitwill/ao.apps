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
    import { ArrowUpCircle, Search } from 'lucide-svelte';
    import { databaseService } from '$lib/database/DatabaseService';
    import type { Resource } from '$lib/database/types';
    import { writable } from 'svelte/store';

    interface SortOption {
        value: 'popular' | 'newest';
        label: string;
    }

    const sortOptions: SortOption[] = [
        { value: 'popular', label: 'Most Popular' },
        { value: 'newest', label: 'Newest' },
    ];

    let resources: Resource[] = [];
    let searchQuery = '';
    let currentPage = 1;
    const itemsPerPage = 10;

    let currentSort = writable<{ value: 'popular' | 'newest' }>({
        value: 'popular',
    });

    function handleSort(event: CustomEvent<{ value: 'popular' | 'newest' }>) {
        currentSort.set(event.detail);
        sortResources();
    }

    onMount(async () => {
        await fetchResources();
    });

    async function fetchResources(): Promise<void> {
        const result = await databaseService.getResources();
        resources = result.data || [];
        sortResources();
    }

    import { get } from 'svelte/store';

    function sortResources(): void {
        resources = resources.sort((a: Resource, b: Resource) => {
            const sortValue = get(currentSort).value; // Access the value property
            if (sortValue === 'popular') {
                return (b.votes ?? 0) - (a.votes ?? 0);
            }
            if (sortValue === 'newest') {
                return (
                    new Date(b.created_at || '').getTime() -
                    new Date(a.created_at || '').getTime()
                );
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

    $: paginatedResources = resources.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    $: totalPages = Math.ceil(resources.length / itemsPerPage);
</script>

<svelte:head>
    <title>Arweave Ecosystem Resource Directory</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
    <header class="mb-8">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold">
                Arweave Ecosystem Resource Directory
            </h1>
            <Button href="/register">Register App</Button>
        </div>
    </header>

    <section class="bg-gray-100 p-8 rounded-lg mb-8">
        <h2 class="text-2xl font-semibold mb-2">
            Discover and Explore Arweave Resources
        </h2>
        <p class="text-gray-600">
            Find apps, websites, libraries, and more in the Arweave ecosystem
        </p>
    </section>

    <div class="mb-6">
        <div class="relative">
            <Input
                type="text"
                placeholder="Search for resources..."
                bind:value={searchQuery}
                on:input={handleSearch}
                class="pr-10"
            />
            <Search
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
            />
        </div>
    </div>

    <div class="flex justify-between items-center mb-6">
        <Button variant="outline">Filters</Button>
        <Select bind:selected={$currentSort} on:select={handleSort}>
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

    <div class="space-y-4">
        {#each paginatedResources as resource (resource.id)}
            <Card class="p-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-xl font-semibold mb-2">
                            {resource.name}
                        </h3>
                        <p class="text-gray-600 mb-2">{resource.description}</p>
                        <div class="flex flex-wrap gap-2">
                            {#each resource.tags.split(',') as tag}
                                <span
                                    class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
                                    >{tag.trim()}</span
                                >
                            {/each}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        on:click={() =>
                            resource.id !== undefined &&
                            handleUpvote(resource.id)}
                        class="flex items-center"
                    >
                        <ArrowUpCircle class="mr-1" size={16} />
                        {resource.votes}
                    </Button>
                </div>
            </Card>
        {/each}
    </div>

    <div class="flex justify-center mt-8">
        <Button
            variant="outline"
            on:click={() => currentPage--}
            disabled={currentPage === 1}
            class="mr-2"
        >
            Previous
        </Button>
        <span class="flex items-center mx-4">
            Page {currentPage} of {totalPages}
        </span>
        <Button
            variant="outline"
            on:click={() => currentPage++}
            disabled={currentPage === totalPages}
            class="ml-2"
        >
            Next
        </Button>
    </div>
</main>
