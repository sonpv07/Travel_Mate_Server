export const VALIDATION_MESSAGES = {
  MIN_LENGTH_NAME: (length: number) =>
    `Your name must contain at least ${length} characters`,
  PASSWORD_IS_NOT_EMPTY: 'Password should not be empty',
  EMAIL_IS_NOT_EMPTY: 'Email should not be empty',
  EMAIL_INVALID: 'Please provide a valid email address',
  PASSWORD_WEAK: 'Password is too weak. Please use a stronger password.',
  PASSWORD_REPEAT_NOT_EMPTY: 'Repeat password should not be empty',
};
