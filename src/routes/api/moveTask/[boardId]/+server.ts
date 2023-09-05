import { json, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

export const POST: RequestHandler = async ({ request, params }) => {
  try {
    const { selectedTaskId, toContainer, newIndex } = await request.json();
    const { boardId } = params;

    const response = await axios.post(
      `http://localhost:3000/${boardId}/move-task`,
      {
        selectedTaskId,
        toContainer,
        newIndex,
      }
    );

    return json({ status: 200, data: response.data });
  } catch (error) {
    return json({ status: 400, error: 'Error moving task' });
  }
};
