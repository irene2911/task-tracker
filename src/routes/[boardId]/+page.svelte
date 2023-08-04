<script lang="ts">
  import StateContainer from '../../components/states/StateContainer.svelte';

  export let data;
</script>

{#if !data}
  <p>Loading...</p>
{:else}
  <div class="flex w-full flex-col px-10 py- gap-20">
    {#if data?.container?.states}
      <h1>{data.container?.name}</h1>
      <div class="flex justify-evenly gap-5">
        {#each data?.container?.states as state}
          <StateContainer container={state} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
