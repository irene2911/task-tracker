import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function POST({ request, params }) {
  try {
    const { selectedTask, toContainer, newIndex } = await request.json();
    const { boardId } = params;

    const response = await axios.post(
      `http://localhost:3000/${boardId}/move-task`,
      {
        selectedTask,
        toContainer,
        newIndex,
      }
    );

    return json({ status: 200, data: response.data });
  } catch (error) {
    return json({ status: 400, error: 'Error moving task' });
  }
}
