import { json } from '@sveltejs/kit';
import axios from 'axios';

interface UpdateData {
  name?: string;
  description?: string;
}

export async function PUT({ request, params }) {
  const { newName, newDescription } = await request.json();
  const { boardId } = params;

  try {
    const updateData: UpdateData = {};

    if (newName !== undefined) {
      updateData.name = newName;
    }

    if (newDescription !== undefined) {
      updateData.description = newDescription;
    }

    if (!updateData.name && !updateData.description) {
      return json({ status: 400, error: 'No update data provided' });
    }

    const response = await axios.put(
      `http://localhost:3000/boards/${boardId}`,
      updateData
    );
    return json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return json({ status: 400, error });
  }
}
