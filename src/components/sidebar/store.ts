import { writable } from 'svelte/store';

export const sidebarStore = writable({
  sidebarIsOpened: true,
  addBoard: false,
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

export type SidebarOptions = Record<
  string,
  { isEditing: boolean; isRenaming: boolean }
>;

export const sidebarOptions = writable<SidebarOptions>({});

export const createBoardOptions = (boardId: string) => {
  const options = {
    isEditing: false,
    isRenaming: false,
  };

  sidebarOptions.update((currentOptions) => ({
    ...currentOptions,
    [boardId]: options,
  }));

  return options;
};

export const editBoard = (boardId: string) => {
  sidebarOptions.update((currentOptions) => ({
    ...currentOptions,
    [boardId]: {
      ...currentOptions[boardId],
      isEditing: true,
    },
  }));
};

export const handleRename = (boardId: string) => {
  sidebarOptions.update((currentOptions) => ({
    ...currentOptions,
    [boardId]: {
      ...currentOptions[boardId],
      isRenaming: !currentOptions[boardId].isRenaming,
    },
  }));
};

export const handleOk = (boardId: string) => {
  sidebarOptions.update((currentOptions) => ({
    ...currentOptions,
    [boardId]: {
      isEditing: false,
      isRenaming: false,
    },
  }));
};

export const closeEdit = (boardId: string) => {
  sidebarOptions.update((currentOptions) => ({
    ...currentOptions,
    [boardId]: {
      ...currentOptions[boardId],
      isEditing: false,
      isRenaming: false,
    },
  }));
};
