<script>
  import '../app.css';
  import Sidebar from '../components/sidebar/Sidebar.svelte';
</script>

<div class="grid grid-cols-5 min-h-screen">
  <div class="col-span-1">
    <Sidebar />
  </div>
  <div class="col-span-4">
    <slot />
  </div>
</div>
