import { updateSidebarBoards } from '$lib/SidebarBoardsStore';
import { fail } from '@sveltejs/kit';
import axios from 'axios';

export async function load() {
  try {
    const response = await axios.get('http://localhost:3000/boards');
    if (response.status === 200) {
      updateSidebarBoards(response.data);

      return { boards: response.data };
    }
  } catch (error) {
    console.error('Error fetching boards:', error);
    return fail(400, { error: 'Error' });
  }
}
