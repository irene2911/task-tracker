import { json, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

interface UpdateTask {
  newTaskText?: string;
  newTaskDesc?: string;
  taskId: string;
}

export const PUT: RequestHandler = async ({ request, params }) => {
  const { newTaskDesc, newTaskText, taskId } = await request.json();
  const { boardId } = params;

  try {
    const updateTask: UpdateTask = { taskId: taskId };

    if (newTaskText !== undefined) {
      updateTask.newTaskText = newTaskText;
    }

    if (newTaskDesc !== undefined) {
      updateTask.newTaskDesc = newTaskDesc;
    }

    if (!updateTask.newTaskText && !updateTask.newTaskDesc) {
      return json({ status: 400, error: 'No update data provided' });
    }

    const response = await axios.put(
      `http://localhost:3000/updateTask/${boardId}`,
      updateTask
    );

    return json({ status: 200, data: response.data });
  } catch (error) {
    return json({ status: 400, error: 'Error moving task' });
  }
};
