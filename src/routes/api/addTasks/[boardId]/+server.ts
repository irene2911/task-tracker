import { json } from '@sveltejs/kit';
import axios from 'axios';

interface TaskData {
  text: string;
  desc?: string;
}

export async function POST({ request, params }) {
  const { taskText, containerId, taskDesc } = await request.json();
  const { boardId } = params;

  try {
    const TaskData: TaskData = { text: taskText, desc: taskDesc };

    const response = await axios.post(
      `http://localhost:3000/${boardId}/${containerId}`,
      TaskData
    );
    return json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return json({ status: 400, error });
  }
}
