<script lang="ts">
    import '../app.pcss';
    import { page } from '$app/stores';
</script>

<main>
    <slot />
</main>

<style>
    main {
        padding: 1rem;
    }
</style>
