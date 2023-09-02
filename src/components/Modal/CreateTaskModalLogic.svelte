<script lang="ts">
  let dialog: HTMLDialogElement;
  export let showModal: boolean = false;

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
  class="rounded-xl bg-white/50 pb-7 shadow-inner shadow-zinc-600/20 bg-gloss p-2"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="flex items-end flex-col mx-5">
    <button
      on:click={() => dialog.close()}
      class="bg-transparent w-fit font-semibold hover:scale-[125%] py-2"
      >X</button
    >
    <slot />
  </div>
</dialog>

<style>
  .bg-gloss {
    backdrop-filter: blur(2px) contrast(1.2);
  }
</style>
