<script lang="ts">
  import { sidebarBoards } from '$lib/SidebarBoardsStore';
  import axios from 'axios';
  import SidebarBoard from './SidebarBoard.svelte';
  import User from './User.svelte';

  let addBoard = false;
  let formRef: HTMLFormElement | null = null;

  function handleAddBoard() {
    addBoard = !addBoard;
  }
</script>

<section class="py-5 bg-red-100 h-full">
  <div class="flex flex-col gap-10">
    <div
      class="border border-black flex flex-row w-full justify-between items-center p-2"
    >
      <User />
    </div>

    <div class="flex flex-col px-5 gap-7">
      <div class="w-full px-3 py-4 text-center">
        <button class="text-2xl" on:click={handleAddBoard}>+</button>
      </div>
      {#if addBoard}
        <form action="?/add" method="post">
          <input
            class="bg-blue-50 px-3 py-4 border-[1px] border-black w-full"
            name="addInput"
            on:keypress={(e) => {
              if (e.key === 'Enter') {
                formRef?.submit();
              }
            }}
          />
        </form>
      {/if}
      {#each $sidebarBoards as board}
        <SidebarBoard {board} />
      {/each}
    </div>
  </div>
</section>
