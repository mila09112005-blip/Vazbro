export const isAdmin = () => {
  const token = localStorage.getItem("access");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "ADMIN";
  } catch {
    return false;
  }
};
