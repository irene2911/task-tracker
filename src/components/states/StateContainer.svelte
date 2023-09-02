<script lang="ts">
  import Task from './Task.svelte';
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import axios from 'axios';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
  import type { State } from '$lib/SidebarBoardsStore';
  import CreateTaskModalLogic from '../Modal/CreateTaskModalLogic.svelte';
  import CreateTaskModal from '../Modal/CreateTaskModal.svelte';
  overrideItemIdKeyNameBeforeInitialisingDndZones('_id');

  export let container: State;
  let showAddInput = false;
  let showModal = false;

  function closeModal() {
    showAddInput = false;
    showModal = false;
  }
  function openModal() {
    showAddInput = true;
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

<section class="flex flex-row w-full justify-evenly gap-5 flex-1">
  <div class="min-h-[70vh] w-full">
    <div class="h-full flex flex-col gap-4">
      <div
        class="flex flex-col w-full justify-between items-center bg-slate-100 rounded-xl"
      >
        <div class="px-5 py-3 flex w-full justify-between">
          <p class="flex justify-center items-center">{container.name}</p>
          <div class="flex gap-3">
            <button class="mb-1.5">...</button>
            <button on:click={openModal} class="hover:scale-125">+</button>
          </div>
        </div>
        {#if showAddInput}
          <CreateTaskModalLogic bind:showModal>
            <CreateTaskModal
              {createTask}
              on:taskCreated={closeModal}
              {showModal}
            />
          </CreateTaskModalLogic>
        {/if}
      </div>
      <div
        class="h-full overflow-y-scroll flex flex-col gap-3"
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
            class="bg-red-300 shadow-inner shadow-red-500/50 w-full min-h-[100px] flex justify-start rounded-xl"
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
