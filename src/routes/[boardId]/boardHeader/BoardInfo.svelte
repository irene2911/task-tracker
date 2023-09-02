<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import axios from 'axios';

  export let boardId: string = '';
  export let boardName: string = '';
  export let boardDesc: string = '';
  let showEdit = false;
  let showInputs = false;
  let newName: string = boardName;
  let newDescription: string = boardDesc;
  let inputRef: HTMLInputElement | null = null;

  function handleShowEdit() {
    showEdit = !showEdit;
    showInputs = false;
  }

  function handleShowInputs() {
    showInputs = true;
  }

  $: {
    if (showInputs) {
      inputRef?.focus();
    }
  }

  function callRename() {
    renameBoard();
    showInputs = !showInputs;
    showEdit = !showEdit;
  }

  async function renameBoard() {
    interface RequestData {
      newName?: string;
      newDescription?: string;
    }
    try {
      const requestData: RequestData = {};

      if (newName !== '') {
        requestData.newName = newName;
      }

      if (newDescription !== '') {
        requestData.newDescription = newDescription;
      }

      await axios.put(`/api/renameBoard/${boardId}`, requestData);

      // TODO: fix me
      invalidateAll();

      newName = '';
      newDescription = '';
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBoard() {
    try {
      await axios.delete(`/api/deleteBoard/${boardId}`);

      // TODO: fix me
      invalidateAll();
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="bg-gray-200/50 w-full rounded-md p-5 bg-gloss flex flex-col gap-5">
  <div class="flex flex-row w-full justify-between text-xl">
    {#if showInputs}
      <div class="flex flex-col gap-5">
        <input
          placeholder={boardName}
          name="renameInput"
          class="block w-full rounded-lg border-0 ring-1 ring-gray-300 focus:ring-gray-400 outline-0 px-4 py-1 text-base"
          bind:this={inputRef}
          bind:value={newName}
          on:keydown={(event) => {
            if (event.key === 'Enter') {
              callRename();
            }
          }}
        />
        <textarea
          rows={4}
          cols="30"
          class="block w-full rounded-lg border-0 ring-1 ring-gray-300 focus:ring-gray-400 outline-0 px-4 py-2 resize-none text-base"
          name="descriptionInput"
          bind:value={newDescription}
          on:keydown={(event) => {
            if (event.key === 'Enter') {
              callRename();
            }
          }}
        />
      </div>
    {:else if !showEdit && !showInputs}
      <div class="flex flex-col gap-3">
        <heade>{boardName}</heade>
        <p class="text-base">{boardDesc}</p>
      </div>
      <button on:click={handleShowEdit} class="hover:scale-105">...</button>
    {:else}
      <div class="flex flex-col gap-3">
        <heade>{boardName}</heade>
        <p class="text-base">{boardDesc}</p>
      </div>
      <button on:click={handleShowEdit} class="hover:scale-110">x</button>
    {/if}
  </div>
  {#if showEdit && !showInputs}
    <div class="w-full flex justify-end gap-5">
      <button
        on:click={handleShowInputs}
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 max-w-fit hover:bg-red-100"
        >Edit</button
      >
      <button
        on:click={deleteBoard}
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 max-w-fit hover:bg-red-100"
        >Delete</button
      >
    </div>
  {:else if showInputs && showEdit}
    <div class="w-full flex justify-end gap-5">
      <button
        on:click={() => callRename()}
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 max-w-fit"
        >Save</button
      >
      <button
        on:click={handleShowEdit}
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 max-w-fit"
        >Close</button
      >
    </div>
  {/if}
</div>

<style>
  .bg-gloss {
    backdrop-filter: blur(2px) contrast(1.2);
  }
</style>
