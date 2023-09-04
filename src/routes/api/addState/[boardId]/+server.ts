import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function POST({ request, params }) {
  const { name } = await request.json();
  const { boardId } = params;

  try {
    const response = await axios.post(
      `http://localhost:3000/state/addState/${boardId}`,
      { name }
    );
    return json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return json({ status: 400, error });
  }
}
