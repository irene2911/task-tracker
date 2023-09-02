<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import type { Item } from '$lib/SidebarBoardsStore';
  import { breakLongWord } from '$lib/utils/WordBreak';
  import axios from 'axios';

  export let task: Item;
  export let showModal: boolean;

  let showEdit = false;
  let newTaskText = task.text;
  let newTaskDesc = task.desc;
  let isTaskEmpty = false;
  let inputRef: HTMLTextAreaElement | null = null;
  let title: string = task.text;
  let desc: string = task.desc;
  $: maxTitle = title ? title.length : 0;
  $: maxDesc = desc ? desc.length : 0;

  const brokenTitle = breakLongWord(title, 50);
  const brokenDesc = breakLongWord(desc, 50);

  async function UpdateTask() {
    try {
      if (newTaskText === '') {
        isTaskEmpty = true;
        return;
      }
      let { boardId } = $page.params;

      await axios.put(`/api/updateTask/${boardId}`, {
        newTaskDesc: newTaskDesc,
        newTaskText: newTaskText,
        taskId: task._id,
      });
      // TODO: fix me
      invalidateAll();
    } catch (error) {
      console.log(error);
    }
  }

  function closeModal() {
    showEdit = false;
    isTaskEmpty = false;
  }

  $: if (!showModal) {
    showEdit = false;
    isTaskEmpty = false;
  }

  $: if (newTaskText !== '') {
    isTaskEmpty = false;
  }

  $: {
    if (showModal) {
      inputRef?.focus();
    }
  }
</script>

<div
  class="px-10 py-5 flex justify-center bg-red-300 shadow-inner shadow-red-500/50 rounded-xl min-h-[200px] max-w-[400px] min-w-[500px]"
>
  <div class="flex flex-col items-end w-full gap-2">
    {#if showEdit}
      <button
        on:click={closeModal}
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 hover:bg-red-100"
        >X</button
      >
    {:else}
      <button
        on:click={() => (showEdit = true)}
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 hover:bg-red-100"
        >edit</button
      >
    {/if}
    <div class="flex flex-col gap-4 text-start w-full">
      {#if showEdit}
        <textarea
          class:border-2={isTaskEmpty}
          class:border-red-500={isTaskEmpty}
          class="block w-full rounded-lg border-0 ring-0 focus:ring-1 ring-gray-300 focus:ring-red-500/70 outline-0 px-4 py-2 resize-none bg-gray-50 focus:bg-white text-sm"
          bind:this={inputRef}
          bind:value={newTaskText}
          on:keydown={(event) => {
            if (event.key === 'Enter') {
              UpdateTask();
            }
          }}
        />

        {#if isTaskEmpty}
          <p class="text-xs text-red-600 text-center">Task must have a name</p>
        {/if}

        <textarea
          rows={4}
          cols="30"
          class="block w-full rounded-lg border-0 ring-0 focus:ring-1 ring-gray-300 focus:ring-red-500/70 outline-0 px-4 py-2 resize-none bg-gray-50 focus:bg-white text-sm"
          name="descriptionInput"
          bind:value={newTaskDesc}
          on:keydown={(event) => {
            if (event.key === 'Enter') {
              UpdateTask();
            }
          }}
        />
        <button
          on:click={UpdateTask}
          class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 w-fit mx-auto hover:bg-red-100"
          >save</button
        >
      {:else}
        {#if maxTitle > 50}
          {brokenTitle}
        {:else}
          <p class="px-3 text-lg">{task.text}</p>
        {/if}
        <span class="h-[0.5px] w-full bg-black" />
        {#if maxDesc > 50}
          {brokenDesc}
        {:else}
          <p class="px-3 text-sm">{task.desc}</p>
        {/if}
      {/if}
    </div>
  </div>
</div>
