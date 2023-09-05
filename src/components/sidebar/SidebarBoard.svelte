<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import type { SidebarBoard } from '$lib/SidebarBoardsStore';
  import axios from 'axios';
  import {
    closeEdit,
    closeRename,
    createBoardOptions,
    editBoard,
    handleRename,
    sidebarOptions,
  } from './store';

  export let board: SidebarBoard;
  let newName: string = board.name;
  let inputRef: HTMLInputElement | null = null;
  let options = createBoardOptions(board._id);
  $: options = $sidebarOptions[board._id] || {};

  $: {
    if (options.isRenaming) {
      inputRef?.focus();
    }
  }

  async function renameBoard() {
    try {
      await axios.put(`/api/renameBoard/${board._id}`, {
        newName,
      });

      // TODO: fix me
      invalidateAll();
      closeEdit(board._id);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBoard() {
    try {
      await axios.delete(`/api/deleteBoard/${board._id}`);

      // TODO: fix me
      invalidateAll();
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div
  class="flex flex-col gap-5 p-5 bg-red-300/90 shadow-inner shadow-red-500/50 rounded-2xl"
>
  <div class="flex flex-row w-full justify-between items-center">
    {#if options.isRenaming}
      <input
        name="renameInput"
        class="block w-full rounded-lg border-0 ring-0 focus:ring-red-500/30 focus:ring-1 outline-0 px-4 py-2 resize-none focus:bg-white bg-gray-50"
        bind:this={inputRef}
        bind:value={newName}
        on:keypress={(e) => {
          if (e.key === 'Enter') {
            renameBoard();
          }
        }}
      />
    {:else}
      <a href={`/${board._id}`} class="w-full">
        <span>{board.name}</span>
      </a>
    {/if}

    {#if !options.isEditing}
      <button on:click={() => editBoard(board._id)}>...</button>
    {:else if options.isEditing && !options.isRenaming}
      <button on:click={() => closeEdit(board._id)}>x</button>
    {/if}
  </div>
  {#if options.isEditing && !options.isRenaming}
    <div class="flex flex-row w-full justify-evenly">
      <button
        on:click={() => handleRename(board._id)}
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 hover:bg-red-100"
        >rename</button
      >
      <form on:submit={deleteBoard}>
        <button
          type="submit"
          class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 hover:bg-red-100"
          >delete</button
        >
      </form>
    </div>
  {:else if options.isRenaming}
    <div class="flex flex-row w-full justify-evenly">
      <button
        on:click={() => renameBoard()}
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 hover:bg-red-100"
        >OK</button
      >
      <button
        on:click={() => closeRename(board._id)}
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 hover:bg-red-100"
        >X</button
      >
    </div>
  {/if}
</div>
