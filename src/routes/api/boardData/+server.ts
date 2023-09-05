import { json, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

export const POST: RequestHandler = async ({ request }) => {
  const { newBoardName } = await request.json();

  try {
    const response = await axios.post(`http://localhost:3000/boards`, {
      name: newBoardName,
    });
    return json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return json({ status: 400, error });
  }
};
