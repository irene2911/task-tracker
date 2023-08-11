<script lang="ts">
  import StateContainer from '../../components/states/StateContainer.svelte';

  export let data;

  // console.log(data.boards);
</script>

{#if !data}
  <p>Loading...</p>
{:else}
  <div class="flex w-full flex-col px-10 pt-10 gap-20 mb-10">
    {#if data?.container?.states}
      <h1>{data.container?.name}</h1>
      <div class="flex justify-evenly gap-5 bg-gray-100/80 p-5 rounded-xl">
        {#each data?.container?.states as state}
          <StateContainer container={state} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
