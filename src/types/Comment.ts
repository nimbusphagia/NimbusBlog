import type { Like } from "./Like"

export type Comment = {
  id: string,
  entryId: String,
  userId: String,
  text: String,
  createdAt: Date,
  likes: Like[]
}

