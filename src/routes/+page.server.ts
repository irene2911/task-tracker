import { fail } from '@sveltejs/kit';
import axios from 'axios';

export const actions = {
  rename: async (event) => {
    const data = await event.request.formData();
    const newName = data.get('renameInput');
    const id = event.url.searchParams.get('id');

    try {
      const response = await axios.put(`http://localhost:3000/boards/${id}`, {
        newName,
      });
      return { status: 200, data: response.data };
    } catch (error) {
      console.log(error);
      return fail(400, { error: 'Failed renaming.' });
    }
  },
  add: async (event) => {
    const data = await event.request.formData();
    const name = data.get('addInput');

    try {
      const response = await axios.post(`http://localhost:3000/boards`, {
        name,
      });
      return { status: 200, data: response.data };
    } catch (error) {
      console.log(error);
      return fail(400, { error: 'Failed adding new board.' });
    }
  },
  delete: async (event) => {
    const id = event.url.searchParams.get('id');
    if (!id) return fail(400, { error: 'no id provided' });

    try {
      const response = await axios.delete(`http://localhost:3000/boards/${id}`);
      return { status: 200, data: response.data };
    } catch (error) {
      console.log(error);
      return fail(400, { error: 'Failed adding new board.' });
    }
  },
};
