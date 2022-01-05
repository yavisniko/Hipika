export const validateEmail = (email: string): boolean => {
  const validation: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return validation.test(email)
}
