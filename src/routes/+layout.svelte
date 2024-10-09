<script lang="ts">
    import { page } from '$app/stores';
</script>

<nav>
    <a href="/" class:active={$page.url.pathname === '/'}>Home</a>
    <a href="/register" class:active={$page.url.pathname === '/register'}
        >Register App</a
    >
</nav>

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
