const STORAGE_KEY = "tex2tex_access_password";
const SESSION_KEY = "tex2tex_authenticated";
const ADMIN_MASTER_HASH = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"; // sha256 of "password" — change this

export function getStoredPassword(): string {
  return localStorage.getItem(STORAGE_KEY) || "Tex2tex2026";
}

export function setStoredPassword(password: string): void {
  localStorage.setItem(STORAGE_KEY, password);
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function authenticate(password: string): boolean {
  if (password === getStoredPassword()) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function clearAuth(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export async function hashSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = await hashSHA256(password);
  return hash === ADMIN_MASTER_HASH;
}
