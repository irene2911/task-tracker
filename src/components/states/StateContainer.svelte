<script lang="ts">
  import type { State } from '$lib/SidebarBoardsStore';
  import Task from './Task.svelte';
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';

  export let container: State;
  let inputRef: HTMLInputElement | null = null;
  let showAddInput = false;

  function handleAddInput() {
    showAddInput = !showAddInput;
  }

  $: {
    if (showAddInput) {
      inputRef?.focus();
    }
  }

  const flipDurationMs = 300;

  function considerCard(e: CustomEvent) {
    items = e.detail.items;
    items = [...items];
  }

  function finalizeCard(e: CustomEvent) {
    items = e.detail.items;
    items = [...items];
  }

  $: items = container?.items?.map((item) => ({
    text: item.text,
    id: item._id,
  }));
</script>

<section class="flex flex-row w-full justify-evenly gap-5 flex-1">
  <div class="board">
    <div class="h-full flex flex-col gap-4">
      <div
        class="flex flex-col w-full justify-between items-center bg-white rounded-xl"
      >
        <div class="px-5 py-3 flex w-full justify-between">
          <p class="column-title">{container.name}</p>
          <div class="flex gap-3">
            <button class="mb-1.5">...</button>
            <button on:click={handleAddInput}>+</button>
          </div>
        </div>
        {#if showAddInput}
          <div class="pt-5 flex flex-col">
            <input
              class="px-3 py-2 rounded-xl bg-gray-100"
              bind:this={inputRef}
            />
            <button class="py-5">Add</button>
          </div>
        {/if}
      </div>
      <div
        class="column-content"
        use:dndzone={{
          items,
          flipDurationMs,
        }}
        on:consider={considerCard}
        on:finalize={finalizeCard}
      >
        {#each items as task (task.id)}
          <div
            animate:flip={{ duration: flipDurationMs }}
            class="bg-red-100 w-full h-[100px] flex items-center justify-center rounded-xl"
          >
            <Task {task} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .board {
    /* height: 70vh; */
    min-height: 70vh;
    width: 100%;
    /* margin-bottom: 40px; */
  }
  .column {
    height: 100%;
    /* width: 250px; */
    padding: 0.5em;
    margin: 1em;
    float: left;
    border: 1px solid #333333;
    /*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
    overflow-y: hidden;
  }
  .column-content {
    height: 100%;
    /* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
    overflow-y: scroll;
  }
  .column-title {
    /* margin-bottom: 1em; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card {
    height: 15%;
    width: 100%;
    margin: 0.4em 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dddddd;
    /* border: 1px solid #333333; */
  }
</style>
