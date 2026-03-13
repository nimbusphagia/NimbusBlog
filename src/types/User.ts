import type { Like } from "./Like";

export type Role = "AUTHOR" | "ADMIN" | "VIEWER";

export type User = {
  id: string,
  name?: string,
  email: string,
  role: Role,
  imgUrl?: string,
  description?: string,
  likes?: Like[]
};

