<script lang="ts">
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
  overrideItemIdKeyNameBeforeInitialisingDndZones('_id');
  import StateContainer from '../../components/states/StateContainer.svelte';
  import BoardInfo from './boardHeader/BoardInfo.svelte';
  import AddState from '../../components/states/AddState.svelte';
  import { sidebarStore } from '../../components/sidebar/store';

  export let data;
</script>

{#if !data}
  <p>Loading...</p>
{:else}
  <div
    class="flex w-full flex-col bg max-h-screen justify-center"
    class:px-6={$sidebarStore.sidebarIsOpened}
    class:px-10={!$sidebarStore.sidebarIsOpened}
  >
    <div class="bg-gray-200/20 bg-gloss rounded-2xl">
      {#if data?.container?.states}
        <BoardInfo
          boardDesc={data?.container?.description}
          boardId={data?.container?._id}
          boardName={data?.container?.name}
        />
        <div
          class="flex-col rounded-xl overflow-x-hidden flex gap-2"
          class:collapsed={!$sidebarStore.sidebarIsOpened}
          class:open={$sidebarStore.sidebarIsOpened}
        >
          <AddState />
          <div
            class="flex justify-start gap-5 overflow-x-scroll scrollbar-hide px-5"
          >
            {#each data?.container?.states as state}
              <StateContainer container={state} />
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .bg {
    background-image: url('$lib/assets/background1.webp');
    background-size: cover;
    background-position: center centerd;
    background-attachment: fixed;
  }

  .collapsed {
    max-width: calc(100vw - 150px);
  }

  .open {
    max-width: calc(100vw - 350px);
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .bg-gloss {
    backdrop-filter: blur(2px) contrast(1.08);
  }
</style>
