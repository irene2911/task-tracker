import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function PUT({ params, request }) {
  const { newStateName } = await request.json();
  const { boardId, columnId } = params;

  try {
    const response = await axios.put(
      `http://localhost:3000/stateRename/${boardId}/${columnId}`,
      { newStateName }
    );
    return json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return json({ status: 400, error });
  }
}
