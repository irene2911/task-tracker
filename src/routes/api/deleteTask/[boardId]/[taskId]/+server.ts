import { json, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

export const DELETE: RequestHandler = async ({ params }) => {
  const { boardId, taskId } = params;

  try {
    const response = await axios.delete(
      `http://localhost:3000/deleteTask/${boardId}/${taskId}`
    );
    return json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return json({ status: 400, error });
  }
};
