// src/helpers/image-helper.ts
export const getImagePath = (courseNameEN: string): string => {
  switch (courseNameEN) {
    case 'Yoga':
      return  "/image/cardOne.png"; // Замените на фактический путь к изображению
    case 'Stretching':
      return  "/image/cardTwo.png";  // Замените на фактический путь к изображению
    case 'Fitness':
      return "/image/cardThree.png"; 
       case 'StepAirobic':
      return "/image/cardFour.png"; 
       case 'BodyFlex':
      return "/image/cardFive.png"; 
    default:
      return "/image/"; 
  }
};


export const getSkillCardImage = (courseId: string): string => {
  switch (courseId) {
    case "ab1c3f": 
      return "/image/skillcard1 .png";
    case "kfpq8e": 
      return "/image/skillcard2.png";
    case "ypox9r": 
      return "/image/skillcard3.png";
    case "6i67sm": 
      return "/image/skillcard4.png";
    case "q02a6i": 
      return "/image/skillcard5.png";
    default:
      return "/image/skillcard1 .png"; 
  }
};