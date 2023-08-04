import { writable } from 'svelte/store';

export interface SidebarBoard {
  _id: string;
  name: string;
  states: State[];
}

export interface State {
  _id: string;
  name: string;
  items: Item[];
}

export interface Item {
  _id: string;
  text: string;
}

export const sidebarBoards = writable<SidebarBoard[]>([]);

export const updateSidebarBoards = (loadedBoards: SidebarBoard[]) => {
  sidebarBoards.update(() => loadedBoards);
};
