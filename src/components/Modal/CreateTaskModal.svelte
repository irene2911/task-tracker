<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let createTask: (taskText: string, taskDesc: string) => Promise<void>;
  export let showModal: boolean;

  let localTaskText: string = '';
  let localTaskDesc: string = '';
  let isTaskTextEmpty: boolean = false;
  let inputRef: HTMLTextAreaElement | null = null;

  const dispatch = createEventDispatcher();

  async function handleSubmit() {
    try {
      if (localTaskText === '') {
        isTaskTextEmpty = true;
        return;
      }
      await createTask(localTaskText, localTaskDesc);

      dispatch('taskCreated');

      localTaskText = '';
      localTaskDesc = '';
    } catch (error) {
      console.log(error);
    }
  }

  $: {
    if (showModal) {
      inputRef?.focus();
    }
  }

  $: if (!showModal) {
    localTaskDesc = '';
    localTaskText = '';
    isTaskTextEmpty = false;
  }

  $: if (localTaskText !== '') {
    isTaskTextEmpty = false;
  }
</script>

<div
  class="px-10 py-5 items-center flex justify-center bg-red-300 shadow-inner shadow-red-500/50 rounded-xl min-h-[200px]"
>
  <div>
    <form
      on:submit|preventDefault={handleSubmit}
      class="flex flex-col gap-7 items-center justify-center"
    >
      <div class="w-full">
        <div class="flex gap-2 flex-col w-full">
          <p>Task name:</p>
          <textarea
            bind:this={inputRef}
            bind:value={localTaskText}
            class="block w-full rounded-lg border-0 ring-0 focus:ring-red-500/30 focus:ring-1 outline-0 px-4 py-2 resize-none focus:bg-white bg-gray-50"
            class:ring-2={isTaskTextEmpty}
            class:ring-red-600={isTaskTextEmpty}
          />
        </div>
        {#if isTaskTextEmpty}
          <p class="text-xs text-red-600 text-center pt-1">
            Task must have a name
          </p>
        {/if}
      </div>
      <div class="flex gap-2 flex-col">
        <p>Task description:</p>
        <textarea
          bind:value={localTaskDesc}
          rows={4}
          cols="30"
          class="block w-full rounded-lg border-0 ring-0 focus:ring-red-500/30 focus:ring-1 outline-0 px-4 py-2 resize-none focus:bg-white bg-gray-50"
          on:keydown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
      </div>
      <button
        type="submit"
        class="text-sm bg-red-200 shadow-inner shadow-red-400/50 rounded-2xl px-5 py-1 hover:bg-red-100"
        >Create Task</button
      >
    </form>
  </div>
</div>
