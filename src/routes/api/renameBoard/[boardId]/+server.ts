import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function PUT({ request, params }) {
  const { newName } = await request.json();
  const { boardId } = params;

  try {
    const response = await axios.put(
      `http://localhost:3000/boards/${boardId}`,
      {
        name: newName,
      }
    );
    return json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return json({ status: 400, error });
  }
}
