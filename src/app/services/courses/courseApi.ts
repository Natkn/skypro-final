
import { getAllCourses } from "@/libs/fitness";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const courses = await getAllCourses();
    res.status(200).json(courses);
  } catch (e) { // Не указываем тип тут, т.к. TypeScript не знает, что это Error
    if (e instanceof Error) { // Проверяем, что e - это Error
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
}