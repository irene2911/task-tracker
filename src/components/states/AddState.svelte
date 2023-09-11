<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import axios from 'axios';

  let showAddState: Boolean = false;
  let inputRef: HTMLInputElement | null = null;
  let newStateName: string = '';

  $: if (showAddState) {
    inputRef?.focus();
  }

  async function addState() {
    try {
      let { boardId } = $page.params;
      await axios.post(`/api/addState/${boardId}`, {
        name: newStateName,
      });
      // TODO: fix me
      invalidateAll();
      showAddState = false;
      newStateName = '';
    } catch (error) {
      console.log(error);
    }
  }
</script>

{#if showAddState}
  <button
    class="w-full text-xl pb-1"
    on:click={() => (showAddState = !showAddState)}>X</button
  >
  <div class="flex flex-row w-full items-center justify-center gap-2">
    <p>Add new State:</p>
    <input
      bind:this={inputRef}
      bind:value={newStateName}
      class="block rounded-lg border-0 ring-1 ring-gray-300 focus:ring-gray-400 outline-0 px-4 py-2 text-base"
      on:keydown={(event) => {
        if (event.key === 'Enter') {
          addState();
        }
      }}
    />
  </div>
{:else}
  <button
    class="w-full text-2xl pb-1"
    on:click={() => (showAddState = !showAddState)}>+</button
  >
{/if}
