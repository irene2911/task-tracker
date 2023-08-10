import { writable } from 'svelte/store';

export const sidebarStore = writable({
  sidebarIsOpened: true,
  addBoard: false,
});

export const sidebarOptions = writable({
  isEditing: false,
  isRenaming: false,
});

export const toggleSidebar = () => {
  sidebarStore.update((currentValue) => ({
    ...currentValue,
    sidebarIsOpened: !currentValue.sidebarIsOpened,
    addBoard: false,
  }));
};

export const toggleAddBoard = () => {
  sidebarStore.update((currentValue) => ({
    ...currentValue,
    addBoard: !currentValue.addBoard,
  }));
};

export const addBoardFromCollapsed = () => {
  sidebarStore.update((currentValue) => ({
    ...currentValue,
    sidebarIsOpened: !currentValue.sidebarIsOpened,
    addBoard: !currentValue.addBoard,
  }));
};

export const editBoard = () => {
  sidebarOptions.update((currentValue) => ({
    ...currentValue,
    isEditing: !currentValue.isEditing,
  }));
};

export const handleRename = () => {
  sidebarOptions.update((currentValue) => ({
    ...currentValue,
    isRenaming: !currentValue.isRenaming,
  }));
};

export const handleOk = () => {
  sidebarOptions.update((currentValue) => ({
    ...currentValue,
    isEditing: false,
    isRenaming: false,
  }));
};

export const closeEdit = () => {
  sidebarOptions.update((currentValue) => ({
    ...currentValue,
    isEditing: false,
    isRenaming: false,
  }));
};
