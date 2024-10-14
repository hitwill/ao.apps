<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { databaseService } from '$lib/database/DatabaseService';
    import type { SaveResource } from '$lib/database/types';
    import { CATEGORIES, ECOSYSTEMS, SUBMISSION_TYPES } from '$lib/constants';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { Textarea } from '$lib/components/ui/textarea';
    import TagSelect from './TagSelect.svelte';
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from '$lib/components/ui/select';
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
    } from './ui/dialog';
    import { joinTags, splitTags } from '$lib/utils/tagHelpers';

    export let open = false;

    const dispatch = createEventDispatcher();
    // Filter out the 'All Categories', 'All Ecosystems', and 'All Types' options
    const filteredCategories = CATEGORIES.filter(
        (category) => category.value !== 'all'
    );
    const filteredEcosystems = ECOSYSTEMS.filter(
        (ecosystem) => ecosystem.value !== 'all'
    );
    const filteredTypes = SUBMISSION_TYPES.filter(
        (type) => type.value !== 'all'
    );

    let resource = {
        name: '',
        link: '',
        description: '',
        type: '',
        tags: [],
        category: '',
        ecosystem: '' as 'arweave' | 'ao',
    };

    let isSubmitting = false;
    let errorMessage = '';

    function handleTagsChange(event: CustomEvent<string[]>) {
        resource.tags = event.detail;
    }

    async function handleSubmit() {
        isSubmitting = true;
        errorMessage = '';

        if (
            !resource.name ||
            !resource.link ||
            !resource.description ||
            !resource.type ||
            !resource.tags ||
            !resource.category ||
            !resource.ecosystem
        ) {
            errorMessage =
                'Please fill in all fields, including category, type, and ecosystem.';
            isSubmitting = false;
            return;
        }
        const submissionResource: SaveResource = {
            ...resource,
            tags: joinTags(resource.tags),
            category: resource.category.value,
            ecosystem: resource.ecosystem.value,
            type: resource.type.value,
        };

        const result = await databaseService.createResource(submissionResource);

        if (result.status) {
            dispatch('resourceAdded', resource);
            close();
        } else {
            errorMessage =
                result.message ||
                'An error occurred while saving the resource.';
        }

        isSubmitting = false;
    }

    function close() {
        open = false;
        isSubmitting = false;
        resource = {
            name: '',
            link: '',
            description: '',
            type: '',
            tags: [],
            category: '',
            ecosystem: '' as 'arweave' | 'ao',
        };
        errorMessage = '';
    }
</script>

<Dialog {open} on:close={close}>
    <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
            <DialogDescription>
                Share a valuable resource with the Arweave and AO community.
                Fill in the details below.
            </DialogDescription>
        </DialogHeader>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div class="space-y-2">
                <Label for="name">Resource Name</Label>
                <Input
                    id="name"
                    bind:value={resource.name}
                    placeholder="e.g., ArDrive"
                    required
                />
            </div>
            <div class="space-y-2">
                <Label for="link">Resource Link</Label>
                <Input
                    id="link"
                    type="url"
                    bind:value={resource.link}
                    placeholder="https://..."
                    required
                />
            </div>
            <div class="space-y-2">
                <Label for="description">Description</Label>
                <Textarea
                    id="description"
                    bind:value={resource.description}
                    placeholder="Briefly describe the resource..."
                    required
                />
            </div>
            <div class="space-y-2">
                <Label for="type">Resource Type</Label>
                <Select
                    bind:selected={resource.type}
                    on:select={() => dispatch('filter')}
                >
                    <SelectTrigger id="type-select" class="w-full">
                        <SelectValue placeholder="Select a resource type" />
                    </SelectTrigger>
                    <SelectContent>
                        {#each filteredTypes as type}
                            <SelectItem value={type.value}
                                >{type.label}</SelectItem
                            >
                        {/each}
                    </SelectContent>
                </Select>
            </div>
            <div class="space-y-2">
                <div class="space-y-2">
                    <Label for="tags">Tags</Label>
                    <TagSelect
                        bind:selectedTags={resource.tags}
                        on:change={handleTagsChange}
                    />
                </div>
            </div>
            <div class="space-y-2">
                <Label for="category">Category</Label>
                <Select
                    bind:selected={resource.category}
                    on:select={() => dispatch('filter')}
                >
                    <SelectTrigger id="category-select" class="w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {#each filteredCategories as category}
                            <SelectItem value={category.value}
                                >{category.label}</SelectItem
                            >
                        {/each}
                    </SelectContent>
                </Select>
            </div>
            <div class="space-y-2">
                <Label for="ecosystem">Ecosystem</Label>
                <Select
                    bind:selected={resource.ecosystem}
                    on:select={() => dispatch('filter')}
                >
                    <SelectTrigger id="ecosystem-select" class="w-full">
                        <SelectValue placeholder="Select an ecosystem" />
                    </SelectTrigger>
                    <SelectContent>
                        {#each filteredEcosystems as ecosystem}
                            <SelectItem value={ecosystem.value}
                                >{ecosystem.label}</SelectItem
                            >
                        {/each}
                    </SelectContent>
                </Select>
            </div>
            {#if errorMessage}
                <p class="text-red-500">{errorMessage}</p>
            {/if}
            <DialogFooter>
                <Button type="button" variant="outline" on:click={close}
                    >Cancel</Button
                >
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Resource'}
                </Button>
            </DialogFooter>
        </form>
    </DialogContent>
</Dialog>
