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

export function formatDateToLocal(date: Date): string {
  // Ensure the input is a Date object
  if (!(date instanceof Date)) {
    throw new Error("Input must be a Date object");
  }

  // Construct the date string in "YYYY-MM-DD" format
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
