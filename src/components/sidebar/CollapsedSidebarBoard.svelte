<script lang="ts">
  import type { SidebarBoard } from '$lib/SidebarBoardsStore';

  export let board: SidebarBoard;

  function getBoardInitials(name: String) {
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0).toLocaleUpperCase());
    return initials.join('.');
  }
  const collapsedBoardName = getBoardInitials(board.name);
</script>

<a href={`/${board._id}`}>
  <button class="bg-red-200 rounded-2xl py-5 w-full"
    >{collapsedBoardName}</button
  >
</a>
