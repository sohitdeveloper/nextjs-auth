export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export function setCookieToken(cookieName: string, cookieValue: string): void {
  document.cookie = `${cookieName}=${cookieValue}; path=/`;
}

export function getCookieNameByValue(cookieValue: string): string | undefined {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (value === cookieValue) {
      return name;
    }
  }

  return undefined; // Return undefined if the cookie with the value is not found
}
