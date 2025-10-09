export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return "Пароль должен содержать не менее 6 символов";
  }
  const specialCharMatches = password.match(/[^A-Za-z0-9]/g) || [];
  if (specialCharMatches.length < 2) {
    return "Пароль должен содержать не менее 2 спецсимволов";
  }
  if (!/[A-Z]/.test(password)) {
    return "Пароль должен содержать как минимум одну заглавную букву";
  }
  return null;
};