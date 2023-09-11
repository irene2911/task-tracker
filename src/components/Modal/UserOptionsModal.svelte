<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount, beforeUpdate } from 'svelte';

  export let darkMode = false;
  let initialized = false;

  export function toggleTheme() {
    darkMode = !darkMode;

    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }

  onMount(() => {
    if (browser) {
      if (localStorage.theme === 'dark' || !('theme' in localStorage)) {
        document.documentElement.classList.add('dark');
        darkMode = true;
      } else {
        document.documentElement.classList.remove('dark');
        darkMode = false;
      }

      initialized = true;
    }
  });

  beforeUpdate(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>`;

  const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>`;
</script>

<div
  class="px-10 py-5 flex items-center bg-red-300 shadow-inner gap-5 shadow-red-500/50 rounded-xl min-h-[200px] max-w-[400px] min-w-[500px] flex-col"
>
  <p>Settings</p>
  {#if initialized}
    <div class="flex flex-row w-full justify-evenly">
      <p>Mode:</p>
      <button
        class="w-10 h-5 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
        on:click={toggleTheme}
      >
        <div
          id="switch-toggle"
          class="w-8 h-8 relative rounded-full transition duration-500 transform {darkMode
            ? 'bg-gray-800'
            : 'bg-yellow-500'}"
          style="transform: translateX({darkMode ? '60%' : '-30%'})"
        >
          {@html darkMode ? darkIcon : lightIcon}
        </div>
      </button>
    </div>
  {/if}
</div>
