<script>
  import { sidebarBoards } from '$lib/SidebarBoardsStore';
  import CollapsedSidebarBoard from './CollapsedSidebarBoard.svelte';
  import { addBoardFromCollapsed } from './store';
</script>

<section class="py-5 h-full bg-gray-100/80">
  <div class="flex flex-col items-center gap-6">
    <div class="flex flex-col items-center gap-2">
      <p class="w-16 h-16 rounded-full border border-gray-200" />
    </div>

    <div class="w-full px-3 py-3 text-center text-2xl">
      <button on:click={addBoardFromCollapsed}>+</button>
    </div>

    <div class="flex flex-col gap-5 w-full px-1">
      {#each $sidebarBoards as board}
        <CollapsedSidebarBoard {board} />
      {/each}
    </div>
  </div>
</section>
