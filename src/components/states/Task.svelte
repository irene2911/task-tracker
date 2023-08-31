<script lang="ts">
  import type { Item } from '$lib/SidebarBoardsStore';

  export let task: Item;
</script>

<div>
  {task.text}
</div>
