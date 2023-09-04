import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function DELETE({ params }) {
  const { boardId, columnId } = params;

  try {
    const response = await axios.delete(
      `http://localhost:3000/deleteState/${boardId}/${columnId}`
    );
    return json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return json({ status: 400, error });
  }
}
