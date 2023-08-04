<script lang="ts">
  import type { SidebarBoard } from '$lib/SidebarBoardsStore';

  export let board: SidebarBoard;
  let isEditing = false;
  let isRenaming = false;
  let formRef: HTMLFormElement | null = null;
  let inputRef: HTMLInputElement | null = null;

  $: {
    if (isRenaming) {
      inputRef?.focus();
    }
  }

  function handleEditing() {
    isEditing = !isEditing;
  }

  function handleRename() {
    isRenaming = !isRenaming;
  }
</script>

<div
  class="flex flex-col gap-5 bg-blue-100 px-3 py-4 border-[1px] border-black"
>
  <div class="flex flex-row w-full justify-between items-center">
    {#if isRenaming}
      <form
        action={`?/rename&id=${board.id}`}
        method="POST"
        bind:this={formRef}
      >
        <input
          name="renameInput"
          class="border border-black p-2"
          on:keypress={(e) => {
            if (e.key === 'Enter') {
              formRef?.submit();
            }
          }}
          bind:this={inputRef}
          on:blur={() => (isRenaming = false)}
        />
      </form>
    {:else}
      <span>{board.name}</span>
    {/if}
    {#if !isEditing}
      <button on:click={handleEditing}>...</button>
    {:else}
      <button on:click={handleEditing}>X</button>
    {/if}
  </div>
  {#if isEditing}
    <div class="flex flex-row w-full justify-evenly">
      <button on:click={handleRename}>rename</button>
      <form action={`?/delete&id=${board.id}`} method="post">
        <button type="submit">delete</button>
      </form>
    </div>
  {/if}
</div>
