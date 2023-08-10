<script>
  import { twMerge } from 'tailwind-merge';
  import '../app.css';
  import Sidebar from '../components/sidebar/Sidebar.svelte';
  import { toggleSidebar, sidebarStore } from '../components/sidebar/store';
  import CollapsedSidebar from '../components/sidebar/CollapsedSidebar.svelte';
</script>

<div class="flex overflow-y-auto">
  <div
    class={twMerge(
      'transition-all duration-[430ms] w-[350px] relative min-h-screen',
      !$sidebarStore.sidebarIsOpened && 'w-20 transition-all duration-[430ms]'
    )}
  >
    {#if $sidebarStore.sidebarIsOpened}<div class="min-h-screen h-full">
        <Sidebar />
      </div>
    {:else}
      <CollapsedSidebar />
    {/if}
    <button
      class="w-[16px] h-[150px] absolute -right-4 top-[35%] bg-red-500 rounded-e-xl"
      on:click={toggleSidebar}
    />
  </div>
  <slot />
</div>
