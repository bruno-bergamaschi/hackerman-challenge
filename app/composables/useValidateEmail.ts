export function useValidateEmail(email: string) {
  if (!email.includes("@")) {
    return false;
  }

  const [username] = email.split("@");

  return username ? username.length >= 3 : false;
}
