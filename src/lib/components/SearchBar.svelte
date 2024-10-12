<script lang="ts">
    // src/lib/components/SearchBar.svelte
    import { Search } from 'lucide-svelte';
    import type { Writable } from 'svelte/store';
    import { Input } from './ui/input';
    import { debounce } from '$lib/utils/debounce';
    import { onMount } from 'svelte';

    export let searchQuery: Writable<string>;

    let inputValue = '';

    const debouncedSearch = debounce((value: string) => {
        searchQuery.set(value);
    }, 1_000);

    onMount(() => {
        return searchQuery.subscribe((value) => {
            inputValue = value;
        });
    });

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        inputValue = target.value;
        debouncedSearch(inputValue);
    }
</script>

<div class="mb-6">
    <div class="relative">
        <Input
            type="text"
            placeholder="Discover apps, tools, libraries, or smart contracts"
            bind:value={inputValue}
            on:input={handleInput}
            class="pr-10"
        />
        <Search
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
        />
    </div>
</div>
