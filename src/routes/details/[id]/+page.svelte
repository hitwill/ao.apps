<script lang="ts">
    import { page } from '$app/stores';

    // The [id] in the folder name becomes a parameter
    $: id = $page.params.id;
</script>

<h1>App Details</h1>
<p>Details for app with ID: {id}</p>

<!-- Add more details and upvoting mechanism here later -->
