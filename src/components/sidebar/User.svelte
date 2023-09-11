<script lang="ts">
  import CreateTaskModalLogic from '../Modal/CreateTaskModalLogic.svelte';
  import UserOptionsModal from '../Modal/UserOptionsModal.svelte';

  let showModal = false;
</script>

<div class="flex flex-row items-center gap-2">
  <div class="w-10 h-10 rounded-full border border-gray-300" />
  <p>user name</p>
</div>

<button on:click={() => (showModal = true)}>...</button>
{#if showModal}
  <CreateTaskModalLogic bind:showModal>
    <UserOptionsModal />
  </CreateTaskModalLogic>
{/if}
