<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { TAGS } from '$lib/constants';
    import { Badge } from '$lib/components/ui/badge';
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';

    export let selectedTags: string[] = [];

    let inputValue = '';
    let filteredTags: string[] = [];
    let showDropdown = false;

    const dispatch = createEventDispatcher();

    $: {
        if (inputValue) {
            filteredTags = TAGS.filter(
                (tag) =>
                    tag.toLowerCase().includes(inputValue.toLowerCase()) &&
                    !selectedTags.includes(tag)
            );
            showDropdown = filteredTags.length > 0;
        } else {
            filteredTags = [];
            showDropdown = false;
        }
    }

    function addTag(tag: string) {
        if (!selectedTags.includes(tag)) {
            selectedTags = [...selectedTags, tag];
            dispatch('change', selectedTags);
        }
        inputValue = '';
    }

    function removeTag(tag: string) {
        selectedTags = selectedTags.filter((t) => t !== tag);
        dispatch('change', selectedTags);
    }
</script>

<div class="relative">
    <div class="flex flex-wrap gap-2 mb-2">
        {#each selectedTags as tag}
            <Badge variant="secondary">
                {tag}
                <Button
                    variant="ghost"
                    size="sm"
                    class="ml-1 p-0"
                    on:click={() => removeTag(tag)}
                >
                    &times;
                </Button>
            </Badge>
        {/each}
    </div>
    <Input
        type="text"
        placeholder="Type to search tags..."
        bind:value={inputValue}
        on:focus={() => (showDropdown = true)}
        on:blur={() => setTimeout(() => (showDropdown = false), 200)}
    />
    {#if showDropdown}
        <ul
            class="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto"
        >
            {#each filteredTags as tag}
                <li
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    on:mousedown={() => addTag(tag)}
                >
                    {tag}
                </li>
            {/each}
        </ul>
    {/if}
</div>
