import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('http://localhost:3000/boards');
    if (response.status === 200) {
      return json(response.data);
    }
  } catch (error) {
    console.error('Error fetching boards:', error);
    return json({ status: 400, error });
  }
}
