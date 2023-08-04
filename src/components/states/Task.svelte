<script lang="ts">
  import type { Item } from '$lib/SidebarBoardsStore';

  export let task: Omit<Item, '_id'>;
</script>

<div>
  {task.text}
</div>

<style>
</style>
