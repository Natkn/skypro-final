
const mockPush = jest.fn();

export const useRouter = () => ({
  push: mockPush,
});

export const usePathname = jest.fn(() => '/');
export const useSearchParams = jest.fn(() => new URLSearchParams());
export const useParams = jest.fn(() => ({}));

export { mockPush };