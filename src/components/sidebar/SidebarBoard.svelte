<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import type { SidebarBoard } from '$lib/SidebarBoardsStore';
  import axios from 'axios';
  import {
    closeEdit,
    createBoardOptions,
    editBoard,
    handleOk,
    handleRename,
    sidebarOptions,
  } from './store';

  export let board: SidebarBoard;
  let newName: string = '';
  let formRef: HTMLFormElement | null = null;
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

      newName = '';
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

<div class="flex flex-col gap-5 p-5 bg-red-200 rounded-2xl">
  <div class="flex flex-row w-full justify-between items-center">
    {#if options.isRenaming}
      <form on:submit={renameBoard} bind:this={formRef}>
        <input
          placeholder={board.name}
          name="renameInput"
          class="border border-black p-2"
          bind:this={inputRef}
          bind:value={newName}
          on:keypress={(e) => {
            if (e.key === 'Enter') {
              formRef?.submit();
            }
          }}
        />
      </form>
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
      <button on:click={() => handleRename(board._id)}>rename</button>
      <form on:submit={deleteBoard}>
        <button type="submit">delete</button>
      </form>
    </div>
  {:else if options.isRenaming}
    <div class="flex flex-row w-full justify-evenly">
      <button on:click={() => handleOk(board._id)}>OK</button>
      <button on:click={() => closeEdit(board._id)}>X</button>
    </div>
  {/if}
</div>
