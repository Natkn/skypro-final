// libs/fitness.ts

interface Course {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  fitting: string[];
  workouts: string[];
  image: string;
  duration: string;
  complexity: string;
}

export async function getAllCourses(): Promise<Course[]> {
  const courses: Course[] = [
    {
      _id: "ab1c3f",
      nameRU: "Йога",
      nameEN: "Yoga",
      description: "Комплекс упражнений для улучшения гибкости и расслабления.",
      directions: [],
      fitting: [],
      workouts: ["17oz5f", "x8abc2"],
      image: "/image/cardOne.png", 
      duration: "20-50 мин/день",
      complexity: "Легкий",
    },
    {
      _id: "bc2d4g",
      nameRU: "Стретчинг",
      nameEN: "Pilates",
      description: "Укрепление мышц кора и улучшение осанки.",
      directions: [],
      fitting: [],
      workouts: ["28pa6g", "y9bcd3"],
      image: "/image/cardTwo.png", // Замените на реальный URL
      duration: "30-45 мин/день",
      complexity: "Средний",
    },
    {
      _id: "cd3e5h",
      nameRU: "Фитнес",
      nameEN: "Crossfit",
      description: "Высокоинтенсивные тренировки для развития силы и выносливости.",
      directions: [],
      fitting: [],
      workouts: ["39qb7h", "z0cde4"],
      image: "/image/cardThree.png", // Замените на реальный URL
      duration: "45-60 мин/день",
      complexity: "Сложный",
    },
    {
      _id: "de4f6i",
      nameRU: "Степ-аэробика",
      nameEN: "Bodybuilding",
      description: "Наращивание мышечной массы и формирование красивого тела.",
      directions: [],
      fitting: [],
      workouts: ["40rc8i", "a1def5"],
      image: "/image/cardFour.png", // Замените на реальный URL
      duration: "60-90 мин/день",
      complexity: "Средний",
    },
    {
      _id: "ef5g7j",
      nameRU: "Бодифлекс",
      nameEN: "Dancing",
      description: "Занятия танцами для улучшения координации и настроения.",
      directions: [],
      fitting: [],
      workouts: ["51sd9j", "b2efg6"],
      image: "/image/cardFive.png", // Замените на реальный URL
      duration: "45-60 мин/день",
      complexity: "Легкий",
    },
  ];

  return courses;
}