import React from 'react';
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Home from './page';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getCourses } from '@/services/courses/courseApi';
import { setAllCourses } from '@/services/feature/courseSlice';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/store/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@/services/courses/courseApi', () => ({
  getCourses: jest.fn(),
}));

jest.mock('@/services/feature/courseSlice', () => ({
  setAllCourses: jest.fn((payload) => ({ type: 'setAllCourses', payload })),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { alt: string }) => <img {...props} alt={props.alt} />,
}));

jest.mock('@/components/card/card', () => ({
  __esModule: true,
  default: (props: { nameRU: string; onClick?: () => void }) => {
    return (
      <div data-testid="course-card" onClick={props.onClick} role="button" tabIndex={0}>
        {props.nameRU}
      </div>
    );
  },
}));

describe('Home component', () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        courses: { allCourses: [] },
        auth: { isAuthenticated: true },
      })
    );
  });

  it('вызывает getCourses, сортирует курсы и диспатчит их', async () => {
    const coursesMock = [
      {
        _id: '2',
        order: 2,
        nameRU: 'Курс 2',
        nameEN: 'Course 2',
        durationInDays: 10,
       dailyDurationInMinutes: {from: 30, to:30},
        difficulty: 'medium',
      },
      {
        _id: '1',
        order: 1,
        nameRU: 'Курс 1',
        nameEN: 'Course 1',
        durationInDays: 5,
       dailyDurationInMinutes: {from: 30, to:30},
        difficulty: 'easy',
      },
    ];

    (getCourses as jest.Mock).mockResolvedValue(coursesMock);

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(getCourses).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(
        setAllCourses([
          {
            _id: '1',
            order: 1,
            nameRU: 'Курс 1',
            nameEN: 'Course 1',
            durationInDays: 5,
            dailyDurationInMinutes: { from: 30, to: 30 },
            difficulty: 'easy',
          },
          {
            _id: '2',
            order: 2,
            nameRU: 'Курс 2',
            nameEN: 'Course 2',
            durationInDays: 10,
            dailyDurationInMinutes: { from: 30, to: 30 },
            difficulty: 'medium',
          },
        ])
      );
    });
  });

it('should scroll to top when the "Наверх" button is clicked', async () => {
  render(<Home />);

  const scrollToMock = jest.fn();
  window.scrollTo = scrollToMock;


  const scrollToTopButton = await screen.findByRole('button', { name: /Наверх/i });
  fireEvent.click(scrollToTopButton);

  expect(scrollToMock).toHaveBeenCalledWith({
    top: 0,
    behavior: 'smooth',
  });
});

it('отображает правильное количество карточек курсов (с учетом numCards)', async () => {
  const coursesMock = [
    { _id: '1', order: 1, nameRU: 'Курс 1', nameEN: 'Course 1', durationInDays: 5, dailyDurationInMinutes: { from: 10, to: 20 }, difficulty: 'easy' },
    { _id: '2', order: 2, nameRU: 'Курс 2', nameEN: 'Course 2', durationInDays: 10, dailyDurationInMinutes: { from: 20, to: 30 }, difficulty: 'medium' },
    { _id: '3', order: 3, nameRU: 'Курс 3', nameEN: 'Course 3', durationInDays: 15, dailyDurationInMinutes: { from: 10, to: 40 }, difficulty: 'hard' },
    { _id: '4', order: 4, nameRU: 'Курс 4', nameEN: 'Course 4', durationInDays: 20, dailyDurationInMinutes: { from: 20, to: 50 }, difficulty: 'medium' },
    { _id: '5', order: 5, nameRU: 'Курс 5', nameEN: 'Course 5', durationInDays: 25, dailyDurationInMinutes: { from: 30, to: 60 }, difficulty: 'hard' },
    { _id: '6', order: 6, nameRU: 'Курс 6', nameEN: 'Course 6', durationInDays: 30, dailyDurationInMinutes: { from: 30, to: 70 }, difficulty: 'expert' },
  ];

  (useAppSelector as jest.Mock).mockImplementation((selector) =>
    selector({
      courses: { allCourses: coursesMock, isLoading: false },
      auth: { isAuthenticated: true },
    })
  );

  render(<Home />);


  const courseCards = await screen.findAllByTestId('course-card');
  expect(courseCards).toHaveLength(5);
});

it('должен перенаправлять на страницу курса при клике на карточку', async () => {
  const coursesMock = [
    {
      _id: '1',
      order: 1,
      nameRU: 'Курс 1',
      nameEN: 'Course 1',
      durationInDays: 5,
      dailyDurationInMinutes: 20,
      difficulty: 'easy',
    },
  ];

  (useAppSelector as jest.Mock).mockImplementation((selector) =>
    selector({
      courses: { allCourses: coursesMock, isLoading: false },
      auth: { isAuthenticated: true },
    })
  );

  render(<Home />);

  const courseCards = await screen.findAllByTestId('course-card');
  fireEvent.click(courseCards[0]);

  expect(mockPush).toHaveBeenCalledWith('/courses/1');
});

it('должен выводить ошибку в консоль, если не удалось загрузить курсы', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const errorMessage = 'Failed to load courses';
  (getCourses as jest.Mock).mockRejectedValue(new Error(errorMessage));

  render(<Home />);

  await waitFor(() => {
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to load courses'),
      expect.any(Error)
    );
  });

  consoleErrorSpy.mockRestore();
});
});