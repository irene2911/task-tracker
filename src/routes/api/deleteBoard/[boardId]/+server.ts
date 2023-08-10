import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function DELETE({ params }) {
  const { boardId } = params;

  try {
    const response = await axios.delete(
      `http://localhost:3000/boards/${boardId}`
    );
    return json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return json({ status: 400, error });
  }
}
