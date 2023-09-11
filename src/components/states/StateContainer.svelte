<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import Task from './Task.svelte';
  import { flip } from 'svelte/animate';
  import axios from 'axios';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import type { State } from '$lib/SidebarBoardsStore';
  import CreateTaskModalLogic from '../Modal/CreateTaskModalLogic.svelte';
  import CreateTaskModal from '../Modal/CreateTaskModal.svelte';

  export let container: State;
  let showAddTaskInput = false;
  let showModal = false;
  let stateEditMode = false;
  let StateisEditing = false;
  let newStateName = container.name;
  let inputRef: HTMLInputElement | null = null;

  function closeState() {
    StateisEditing = false;
    stateEditMode = false;
  }

  $: {
    if (StateisEditing) {
      inputRef?.focus();
    }
  }

  function closeModal() {
    showAddTaskInput = false;
    showModal = false;
  }
  function openModal() {
    showAddTaskInput = true;
    showModal = true;
  }

  async function createTask(taskText: string, taskDesc: string) {
    try {
      if (taskDesc !== '') {
        taskText = taskText;
      }
      let { boardId } = $page.params;

      await axios.post(`/api/addTasks/${boardId}`, {
        containerId: container._id,
        taskText,
        taskDesc,
      });
      // TODO: fix me
      invalidateAll();

      taskText = '';
    } catch (error) {
      console.log(error);
    }
  }

  async function renameState() {
    try {
      let { boardId } = $page.params;
      let columnId = container._id;
      await axios.put(`/api/stateRename/${boardId}/${columnId}`, {
        newStateName: newStateName,
      });
      // TODO: fix me
      invalidateAll();
      closeState();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteState() {
    try {
      let { boardId } = $page.params;
      let columnId = container._id;
      await axios.delete(`/api/deleteState/${boardId}/${columnId}`);
      // TODO: fix me
      invalidateAll();
      closeState();
    } catch (error) {
      console.log(error);
    }
  }

  async function moveTasks(selectedTaskId: string, newIndex: number) {
    try {
      let { boardId } = $page.params;

      await axios.post(`/api/moveTask/${boardId}`, {
        toContainer: container._id,
        selectedTaskId,
        newIndex,
      });
      // TODO: fix me
      invalidateAll();
    } catch (error) {
      console.log(error);
    }
  }

  const flipDurationMs = 300;

  function considerCard(e: CustomEvent) {
    items = [...e.detail.items];
  }

  let newIndex: number = -1;

  async function finalizeCard(e: CustomEvent) {
    if (!e.detail.items.length) return;

    if (e.detail.info.trigger === 'droppedIntoZone') {
      const selectedTaskId = e.detail.info.id;

      const taskIndex = items.findIndex((task) => task._id === selectedTaskId);
      if (taskIndex !== -1) {
        newIndex = taskIndex;
        await moveTasks(selectedTaskId, newIndex);
        items = [...e.detail.items];
        return newIndex;
      }
    }
  }

  $: items =
    container?.items?.map((item) => ({
      desc: item.desc,
      order: item.order,
      text: item.text,
      _id: item._id,
    })) ?? [];
</script>

<section
  class="flex flex-row w-full justify-evenly gap-5 flex-1 min-w-[250px] max-w-[300px] rounded-2xl pb-3"
>
  <div class="min-h-[70vh] w-full">
    <div class="h-full flex flex-col overflow-hidden gap-3">
      <div
        class="flex flex-col w-full justify-between items-center bg-white/90 rounded-xl"
      >
        <div class="px-5 py-3 flex w-full justify-between">
          {#if StateisEditing}
            <input
              class="block w-full rounded-lg border-0 ring-1 ring-gray-300 focus:ring-gray-400 outline-0 px-4 py-1 text-base"
              bind:this={inputRef}
              bind:value={newStateName}
              on:keydown={(event) => {
                if (event.key === 'Enter') {
                  renameState();
                }
              }}
            />
          {:else}
            <p class="flex justify-center items-center">{container.name}</p>
            <div class="flex gap-3">
              <button
                class="mb-1.5"
                on:click={() => (stateEditMode = !stateEditMode)}>...</button
              >
              <button on:click={openModal} class="hover:scale-125">+</button>
            </div>
          {/if}
        </div>
        <div class="flex flex-row w-full justify-evenly pb-2">
          {#if stateEditMode && !StateisEditing}
            <button on:click={() => (StateisEditing = true)}>edit</button>
            <button on:click={deleteState}>delete</button>
          {:else if StateisEditing && stateEditMode}
            <button on:click={renameState}>OK</button>
            <button
              on:click={() => {
                StateisEditing = false;
                stateEditMode = false;
              }}>cancel</button
            >
          {/if}
        </div>
      </div>
      {#if showAddTaskInput}
        <CreateTaskModalLogic bind:showModal>
          <CreateTaskModal
            {createTask}
            on:taskCreated={closeModal}
            {showModal}
          />
        </CreateTaskModalLogic>
      {/if}
      <div
        class="h-full overflow-scroll flex flex-col gap-3 max-h-[500px] scrollbar-hide rounded-2xl border-2 border-slate-100/40"
        use:dndzone={{
          items,
          flipDurationMs,
          dropTargetStyle: { outline: 'none' },
          dropTargetClasses: ['dropClass'],
        }}
        on:consider={considerCard}
        on:finalize={finalizeCard}
      >
        {#each items as task ((task._id, task))}
          <div
            animate:flip={{ duration: flipDurationMs }}
            class="bg-red-300 shadow-inner shadow-red-500/50 w-full flex justify-start rounded-xl"
            role="button"
            tabindex="0"
          >
            <Task {task} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* .bg-gloss {
    backdrop-filter: blur(4px) contrast(1.2);
  } */

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
