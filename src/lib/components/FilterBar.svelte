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
    import MultiSelect from 'svelte-multiselect';

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

        $selectedTags = $selectedTags.slice(); // Create a new array to trigger reactivity

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
</script>

<div class="flex flex-wrap gap-4 items-center mb-6">
    <Select
        bind:selected={$selectedEcosystem}
        on:select={() => dispatch('filter')}
    >
        <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select ecosystem" />
        </SelectTrigger>
        <SelectContent>
            {#each ECOSYSTEMS as ecosystem}
                <SelectItem value={ecosystem.value}
                    >{ecosystem.label}</SelectItem
                >
            {/each}
        </SelectContent>
    </Select>

    <Select
        bind:selected={$selectedCategory}
        on:select={() => dispatch('filter')}
    >
        <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
            {#each CATEGORIES as category}
                <SelectItem value={category.value}>{category.label}</SelectItem>
            {/each}
        </SelectContent>
    </Select>

    <MultiSelect
        options={TAGS}
        bind:selected={$selectedTags}
        placeholder="Select tags"
        on:change={handleTagsChange}
        autocomplete="on"
    />

    <Select bind:selected={$currentSort} on:select={handleSort}>
        <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
            {#each SORT_OPTIONS as option}
                <SelectItem value={option}>{option.label}</SelectItem>
            {/each}
        </SelectContent>
    </Select>
</div>
