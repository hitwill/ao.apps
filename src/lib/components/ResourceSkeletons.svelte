<script lang="ts">
    // src/lib/components/ResourceSkeletons.svelte
    import { Card } from './ui/card';

    export let count = 5; // Default to 5 skeleton items, but allow it to be customized
</script>

<div class="space-y-4">
    {#each Array(count) as _}
        <Card class="p-4 animate-pulse">
            <div class="flex justify-between">
                <div class="space-y-2 w-3/4">
                    <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div class="space-y-2 w-1/4 flex flex-col items-end">
                    <div class="h-8 bg-gray-200 rounded w-16"></div>
                    <div class="h-8 bg-gray-200 rounded w-24"></div>
                </div>
            </div>
        </Card>
    {/each}
</div>
