<script lang="ts">
    // src/lib/components/SearchBar.svelte
    import { Search } from 'lucide-svelte';
    import type { Writable } from 'svelte/store';
    import { Input } from './ui/input';

    export let searchQuery: Writable<string>;
</script>

<div class="mb-6">
    <div class="relative">
        <Input
            type="text"
            placeholder="Discover apps, tools, libraries, or smart contracts"
            bind:value={$searchQuery}
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
