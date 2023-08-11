<script lang="ts">
  import type { SidebarBoard, State } from '$lib/SidebarBoardsStore';
  import Task from './Task.svelte';
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import axios from 'axios';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';

  export let container: State;
  let inputRef: HTMLInputElement | null = null;
  let formRef: HTMLFormElement | null = null;
  let showAddInput = false;
  let taskText: string = '';

  let { boardId } = $page.params;

  // console.log(boardsIds);
  function handleAddInput() {
    showAddInput = !showAddInput;
  }

  $: {
    if (showAddInput) {
      inputRef?.focus();
    }
  }

  async function createTask() {
    try {
      await axios.post(`/api/addTasks/${boardId}`, {
        taskText,
        containerId: container._id,
      });

      // TODO: fix me
      invalidateAll();

      taskText = '';
    } catch (error) {
      console.log(error);
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
  <div class="min-h-[70vh] w-full">
    <div class="h-full flex flex-col gap-4">
      <div
        class="flex flex-col w-full justify-between items-center bg-white rounded-xl"
      >
        <div class="px-5 py-3 flex w-full justify-between">
          <p class="flex justify-center items-center">{container.name}</p>
          <div class="flex gap-3">
            <button class="mb-1.5">...</button>
            <button on:click={handleAddInput}>+</button>
          </div>
        </div>
        {#if showAddInput}
          <form on:submit={createTask} bind:this={formRef}>
            <div class="pt-5 flex flex-col">
              <input
                class="px-3 py-2 rounded-xl bg-gray-100"
                bind:this={inputRef}
                bind:value={taskText}
                on:keypress={(e) => {
                  if (e.key === 'Enter') {
                    formRef?.submit();
                  }
                }}
              />
            </div>
          </form>
          <button class="py-5" on:click={createTask}>Add</button>
        {/if}
      </div>
      <div
        class="h-full overflow-y-scroll flex flex-col gap-3"
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
