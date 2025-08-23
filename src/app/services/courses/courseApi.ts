
import { getAllCourses } from "@/libs/fitness";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const courses = await getAllCourses();
    res.status(200).json(courses);
  } catch (e) { 
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
}