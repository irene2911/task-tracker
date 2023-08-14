<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { sidebarBoards } from '$lib/SidebarBoardsStore';
  import axios from 'axios';
  import SidebarBoard from './SidebarBoard.svelte';
  import User from './User.svelte';
  import { sidebarStore, toggleAddBoard } from './store';

  let formRef: HTMLFormElement | null = null;
  let newBoardName: string = '';
  let inputRef: HTMLInputElement | null = null;

  $: {
    if ($sidebarStore.addBoard) {
      inputRef?.focus();
    }
  }

  async function createBoard() {
    try {
      await axios.post('/api/boardData', {
        newBoardName,
      });

      // TODO: fix me
      invalidateAll();

      newBoardName = '';
    } catch (error) {
      console.log(error);
    }
  }
</script>

<section class="bg-gray-100/80 h-full flex flex-row justify-end w-full">
  <div class="flex flex-col px-5 py-5 w-full">
    <div
      class="border-[2px] border-gray-200 flex flex-row w-full justify-between items-center p-4 rounded-2xl"
    >
      <User />
    </div>

    <div class="flex flex-col gap-7">
      {#if !$sidebarStore.addBoard}
        <div class="w-full px-3 py-4 text-center">
          <button class="text-2xl" on:click={toggleAddBoard}>+</button>
        </div>
      {:else}
        <div class="w-full px-3 py-4 text-center">
          <button class="text-2xl" on:click={toggleAddBoard}>X</button>
        </div>
        <form on:submit={createBoard}>
          <input
            class="bg-blue-50 px-3 py-4 border-[1px] border-black w-full"
            name="addInput"
            bind:this={inputRef}
            bind:value={newBoardName}
            on:keypress={(e) => {
              if (e.key === 'Enter') {
                formRef?.submit();
                setTimeout(() => {
                  $sidebarStore.addBoard = false;
                }, 10);
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
