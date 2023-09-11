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
  let nameTooLong = false;

  $: {
    if ($sidebarStore.addBoard) {
      inputRef?.focus();
    }
  }

  async function createBoard() {
    try {
      const boardNameWords = newBoardName.split(' ');

      if (boardNameWords.length > 4) {
        nameTooLong = true;
        return;
      } else {
        nameTooLong = false;
        await axios.post('/api/boardData', {
          newBoardName,
        });

        // TODO: fix me
        invalidateAll();
      }
      newBoardName = '';
      nameTooLong = false;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<section class="h-full flex flex-row justify-end w-full">
  <div class="flex flex-col px-5 py-5 w-full gap-4 h-full">
    <div
      class="border-[1px] border-gray-300 flex flex-row w-full justify-between items-center p-4 rounded-2xl shadow-inner shadow-slate-400/30"
    >
      <User />
    </div>

    <div class="flex flex-col rounded-2xl">
      {#if !$sidebarStore.addBoard}
        <div class="w-full px-3 py-2 text-center">
          <button class="text-2xl" on:click={toggleAddBoard}>+</button>
        </div>
      {:else}
        <div class="w-full px-3 py-4 text-center">
          <button class="text-xl" on:click={toggleAddBoard}>X</button>
        </div>
        <form on:submit={createBoard} class="px-1 flex flex-col gap-3">
          {#if nameTooLong}
            <p class="text-xs text-red-600 text-center pt-1">
              Board's name can't be longer than 5 words
            </p>
          {/if}
          <input
            class="block w-full rounded-lg border-0 ring-0 focus:ring-red-500/30 focus:ring-1 outline-0 px-3 py-4 resize-none focus:bg-white bg-gray-50"
            class:border-2={nameTooLong}
            class:border-red-500={nameTooLong}
            name="addInput"
            bind:this={inputRef}
            bind:value={newBoardName}
            on:keypress={(e) => {
              if (e.key === 'Enter') {
                formRef?.submit();
                setTimeout(() => {
                  if (!nameTooLong) {
                    $sidebarStore.addBoard = false;
                  }
                }, 10);
              }
            }}
          />
        </form>
      {/if}
    </div>
    <div
      class="overflow-y-scroll scrollbar-hide h-full flex flex-col gap-4 pb-5 rounded-2xl"
    >
      {#each $sidebarBoards as board}
        <SidebarBoard {board} />
      {/each}
    </div>
  </div>
</section>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
