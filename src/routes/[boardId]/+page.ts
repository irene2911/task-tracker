import type { SidebarBoard } from '$lib/SidebarBoardsStore';
import { fail } from '@sveltejs/kit';
import axios from 'axios';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  try {
    const res = await axios.get<SidebarBoard>(
      `http://localhost:3000/boards/${params.boardId}`
    );
    return { container: res.data };
  } catch (error) {
    console.log(error);
    return fail(400, { error: 'Failed fetching.' });
  }
};
