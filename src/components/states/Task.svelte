<script lang="ts">
  import type { Item } from '$lib/SidebarBoardsStore';
  import { breakLongWord, isOneWord } from '$lib/utils/WordBreak';
  import CreateTaskModalLogic from '../Modal/CreateTaskModalLogic.svelte';
  import FullTaskModal from '../Modal/FullTaskModal.svelte';

  export let task: Item;

  let showModal = false;
  let desc: string = task.desc;
  $: maxDesc = desc ? desc.length : 0;

  let trucatedTextLarge = desc.substring(0, 80) + '...';

  const check = isOneWord(desc);

  const brokenDesc = breakLongWord(desc, 45);
</script>

<div
  class="flex flex-col w-full py-3"
  on:click={() => (showModal = true)}
  role="button"
  tabindex="0"
  on:keydown={() => (showModal = true)}
>
  <div
    class="flex flex-col items-start text-start"
    class:gap-2={task.desc.length > 0}
  >
    <p class="px-4 flex-wrap">
      {task.text}
    </p>
    <p class="text-sm font-light px-3">
      {#if maxDesc > 80 && !check}
        {trucatedTextLarge}
      {:else if check}
        {brokenDesc}
      {:else}
        {task.desc}
      {/if}
    </p>
  </div>
</div>
<CreateTaskModalLogic bind:showModal>
  <FullTaskModal {task} {showModal} />
</CreateTaskModalLogic>
