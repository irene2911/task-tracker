<script lang="ts">
  import type { State } from '$lib/SidebarBoardsStore';
  import Task from './Task.svelte';
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';

  export let container: State;

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
  $: console.log(items);
</script>

<section class="flex flex-row w-full justify-evenly gap-5 flex-1">
  <div class="board">
    <div class="border h-full">
      <div class="flex flex-row w-full justify-between items-center">
        <div class="column-title">{container.name}</div>
        <!-- {#if !$inputVisibilityStore[column.id]}
                <button
                  class="my-auto"
                  on:click={() => showInput(column)}
                  id={`${column.id}`}>Add</button
                >
              {:else}
                <button on:click={() => hideInput(column)}>Add</button>
              {/if} -->
      </div>
      <!-- {#if $inputVisibilityStore[column.id]}
              <input
                class="border-[1px] rounded-md w-full px-5 py-3"
                type="text"
                placeholder="Enter something"
                bind:this={inputElement}
                on:blur={() => {
                  hideInput(column);
                  addNewItem(column.id, inputElement.value);
                  inputElement.value = '';
                }}
              />
            {/if} -->
      <div
        class="column-content"
        use:dndzone={{ items, flipDurationMs }}
        on:consider={considerCard}
        on:finalize={finalizeCard}
      >
        {#each items as task (task.id)}
          <div animate:flip={{ duration: flipDurationMs }} class="card">
            <Task {task} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .board {
    height: 90vh;
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
    border: 1px solid #333333;
  }
</style>
