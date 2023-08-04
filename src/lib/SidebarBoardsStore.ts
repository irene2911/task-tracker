import { writable } from 'svelte/store';

export interface SidebarBoard {
  id: string;
  name: string;
}

export const sidebarBoards = writable<SidebarBoard[]>([]);

export const updateSidebarBoards = (loadedBoards: SidebarBoard[]) => {
  sidebarBoards.update(() => loadedBoards);
};
