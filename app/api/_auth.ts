import { cookies } from "next/headers";

export async function requireAdmin() {
  const c = await cookies();
  const isAdmin = c.get("isAdmin")?.value === "1";
  if (!isAdmin) {
    const err = new Error("UNAUTHORIZED");
    // Optionally attach status
    // @ts-expect-error custom prop
    err.status = 401;
    throw err;
  }
}
