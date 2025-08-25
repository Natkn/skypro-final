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