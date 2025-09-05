import { render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Home from './page';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getCourses } from '@/services/courses/courseApi';
import { setAllCourses } from '@/services/feature/courseSlice';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/store/store');
jest.mock('@/services/courses/courseApi');
jest.mock('@/services/feature/courseSlice');

describe('Home component', () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();
  const fakeState = {
    courses: { allCourses: [] },
    auth: { isAuthenticated: true },
  };

  beforeEach(() => {
    jest.clearAllMocks();


    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selector: any) => {
      return selector(fakeState);
    });
  });

  it('вызывает getCourses, сортирует курсы и диспатчит их', async () => {
    const coursesMock = [
      { _id: '2', order: 2, nameRU: 'Курс 2', nameEN: 'Course 2', durationInDays: 10, dailyDurationInMinutes: 30, difficulty: 'medium' },
      { _id: '1', order: 1, nameRU: 'Курс 1', nameEN: 'Course 1', durationInDays: 5, dailyDurationInMinutes: 20, difficulty: 'easy' },
    ];
    (getCourses as jest.Mock).mockResolvedValue(coursesMock);

    render(<Home />);

    await waitFor(() => {
      expect(getCourses).toHaveBeenCalled();

      expect(mockDispatch).toHaveBeenCalledWith(setAllCourses([
        {
          _id: '1',
          order: 1,
          nameRU: 'Курс 1',
          nameEN: 'Course 1',
          durationInDays: 5,
          dailyDurationInMinutes: { from: 15, to: 25 },
          difficulty: 'easy',
        },
        {
          _id: '2',
          order: 2,
          nameRU: 'Курс 2',
          nameEN: 'Course 2',
          durationInDays: 10,
          dailyDurationInMinutes: { from: 15, to: 25 },
          difficulty: 'medium',
        },
      ]));
    });
  });
});

