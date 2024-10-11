<script lang="ts">
    import { SORT_OPTIONS, CATEGORIES, ECOSYSTEMS, TAGS } from '$lib/constants';
    import type { Writable } from 'svelte/store';
    import type { SortOption, Selected } from '$lib/types';
    import { createEventDispatcher } from 'svelte';
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from './ui/select';
    import { Label } from './ui/label';
    import MultiSelect from 'svelte-multiselect';
    import { Button } from './ui/button';
    import { Filter, X } from 'lucide-svelte';

    export let selectedEcosystem: Writable<Selected<string>>;
    export let selectedCategory: Writable<Selected<string>>;
    export let currentSort: Writable<SortOption>;
    export let selectedTags: Writable<string[]>;

    const dispatch = createEventDispatcher();

    function handleSort() {
        dispatch('sort');
    }

    function handleTagsChange(event: { detail: { option: any; type: any } }) {
        const { option, type } = event.detail;

        $selectedTags = $selectedTags.slice();

        switch (type) {
            case 'add':
                if (!$selectedTags.includes(option)) {
                    $selectedTags.push(option);
                }
                break;
            case 'remove':
                $selectedTags = $selectedTags.filter((tag) => tag !== option);
                break;
            case 'removeAll':
                $selectedTags = [];
                break;
        }

        dispatch('filter');
    }

    function clearFilters() {
        $selectedEcosystem = ECOSYSTEMS[0];
        $selectedCategory = CATEGORIES[0];
        $selectedTags = [];
        dispatch('filter');
    }

    let isFilterExpanded = false;
</script>

<div class="mb-6">
    <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
    >
        <h2 class="text-lg font-semibold mb-2 sm:mb-0">Filter & Sort</h2>
        <div class="flex items-center">
            <Button
                variant="outline"
                class="mr-2"
                on:click={() => (isFilterExpanded = !isFilterExpanded)}
            >
                <Filter class="mr-2 h-4 w-4" />
                {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <Select bind:selected={$currentSort} on:select={handleSort}>
                <SelectTrigger class="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    {#each SORT_OPTIONS as option}
                        <SelectItem value={option}>{option.label}</SelectItem>
                    {/each}
                </SelectContent>
            </Select>
        </div>
    </div>

    {#if isFilterExpanded}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <Label for="ecosystem-select" class="mb-2 block"
                    >Ecosystem</Label
                >
                <Select
                    bind:selected={$selectedEcosystem}
                    on:select={() => dispatch('filter')}
                >
                    <SelectTrigger id="ecosystem-select" class="w-full">
                        <SelectValue placeholder="All Ecosystems" />
                    </SelectTrigger>
                    <SelectContent>
                        {#each ECOSYSTEMS as ecosystem}
                            <SelectItem value={ecosystem.value}
                                >{ecosystem.label}</SelectItem
                            >
                        {/each}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label for="category-select" class="mb-2 block">Category</Label>
                <Select
                    bind:selected={$selectedCategory}
                    on:select={() => dispatch('filter')}
                >
                    <SelectTrigger id="category-select" class="w-full">
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        {#each CATEGORIES as category}
                            <SelectItem value={category.value}
                                >{category.label}</SelectItem
                            >
                        {/each}
                    </SelectContent>
                </Select>
            </div>

            <div class="sm:col-span-2">
                <Label for="tags-select" class="mb-2 block">Tags</Label>
                <MultiSelect
                    options={TAGS}
                    bind:selected={$selectedTags}
                    placeholder="Select tags"
                    on:change={handleTagsChange}
                    autocomplete="on"
                    id="tags-select"
                    class="w-full"
                />
            </div>
        </div>

        <div class="mt-4 flex justify-end">
            <Button variant="outline" on:click={clearFilters} class="text-sm">
                <X class="mr-2 h-4 w-4" />
                Clear Filters
            </Button>
        </div>
    {/if}
</div>
