<script lang="ts">
    import '../app.pcss';
    import { page } from '$app/stores';
</script>

<main>
    <slot />
</main>

<style>
    nav {
        padding: 1rem;
        background-color: #f0f0f0;
    }
    a {
        margin-right: 1rem;
        color: #333;
        text-decoration: none;
    }
    .active {
        font-weight: bold;
    }
    main {
        padding: 1rem;
    }
</style>
