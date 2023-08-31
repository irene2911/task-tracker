<script lang="ts">
  import StateContainer from '../../components/states/StateContainer.svelte';
  import BoardInfo from './boardHeader/BoardInfo.svelte';

  export let data;
</script>

{#if !data}
  <p>Loading...</p>
{:else}
  <div class="flex w-full flex-col px-10 py-10 gap-20 bg">
    {#if data?.container?.states}
      <BoardInfo
        boardDesc={data?.container?.description}
        boardId={data?.container?._id}
        boardName={data?.container?.name}
      />
      <div
        class="flex justify-evenly gap-5 bg-gray-200/50 p-5 rounded-xl bg-gloss"
      >
        {#each data?.container?.states as state}
          <StateContainer container={state} />
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .bg {
    background-image: url('$lib/assets/background.webp');
    background-size: cover;
    background-position: center centerd;
    background-attachment: fixed;
  }

  .bg-gloss {
    backdrop-filter: blur(2px) contrast(1.2);
  }
</style>
