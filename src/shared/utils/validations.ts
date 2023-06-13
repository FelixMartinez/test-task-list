/**
 * Check if an email address is valid.
 * @param email Email address to validate.
 * @returns `true` if the email address is valid, `false` otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!match;
};

/**
 * Checks if an email address is valid and returns an error message if it is not.
 * @param email Email address to validate.
 * @returns `undefined` if the email address is valid, otherwise a text string indicating that the email address appears to be invalid.
 */
export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email) ? undefined : "El correo no parece ser válido";
};
