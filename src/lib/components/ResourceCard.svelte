<script lang="ts">
    // src/lib/components/ResourceCard.svelte
    import {
        ArrowUpCircle,
        Sticker,
        Globe,
        Book,
        AlertTriangle,
        Layers,
    } from 'lucide-svelte';
    import type { FetchResource } from '$lib/database/types';
    import { splitTags } from '$lib/utils/tagHelpers';

    export let resource: FetchResource;

    function getResourceIcon(type: string) {
        switch (type) {
            case 'application':
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

    function getResourceTypeLabel(type: string) {
        return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
    }

    function handleUpvote() {
        if (resource.id !== undefined) {
            dispatch('upvote', resource.id);
        }
    }

    import { createEventDispatcher } from 'svelte';
    import { Card } from './ui/card';
    import { Button } from './ui/button';
    import { Badge } from './ui/badge';
    const dispatch = createEventDispatcher();
</script>

<Card class="p-4 hover:shadow-lg transition-shadow duration-200">
    <div class="flex justify-between items-start">
        <div class="flex-grow">
            <div class="flex items-center mb-2">
                <svelte:component
                    this={getResourceIcon(resource.type)}
                    size={20}
                    class="mr-2 text-gray-600"
                />
                <h3 class="text-xl font-semibold">{resource.name}</h3>
            </div>
            <div class="flex items-center mb-2 text-sm text-gray-600">
                <Badge variant="secondary" class="mr-2"
                    >{getResourceTypeLabel(resource.type)}</Badge
                >
                <span>{resource.ecosystem}</span>
            </div>
            <p class="text-gray-600 mb-2">{resource.description}</p>
            <div class="flex flex-wrap gap-2 mt-2">
                {#each splitTags(resource.tags) as tag}
                    <span
                        class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
                        >{tag.trim()}</span
                    >
                {/each}
            </div>
        </div>
        <div class="flex flex-col items-end ml-4">
            <Button
                variant="ghost"
                on:click={handleUpvote}
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
