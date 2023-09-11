<script>
  import { twMerge } from 'tailwind-merge';
  import '../app.css';
  import Sidebar from '../components/sidebar/Sidebar.svelte';
  import { toggleSidebar, sidebarStore } from '../components/sidebar/store';
  import CollapsedSidebar from '../components/sidebar/CollapsedSidebar.svelte';
  import { onDestroy, onMount } from 'svelte';

  let loaded = false;

  if (typeof localStorage !== 'undefined') {
    const savedSidebarState = localStorage.getItem('sidebarIsOpened');
    if (savedSidebarState !== null) {
      sidebarStore.set({
        sidebarIsOpened: JSON.parse(savedSidebarState),
        addBoard: false,
      });
      loaded = true;
    }
  }

  if (!loaded) {
    sidebarStore.set({
      sidebarIsOpened: true,
      addBoard: false,
    });
  }

  $: {
    const sidebarState = $sidebarStore.sidebarIsOpened;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('sidebarIsOpened', JSON.stringify(sidebarState));
    }
  }

  onDestroy(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('sidebarIsOpened');
    }
  });
</script>

{#if loaded}
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
        class="w-[16px] h-[150px] absolute -right-4 top-[35%] bg-gray-200/80 hover:bg-red-300 hover:shadow-inner hover:shadow-red-500/60 rounded-e-xl"
        on:click={toggleSidebar}
      />
    </div>
    <slot />
  </div>
{/if}
