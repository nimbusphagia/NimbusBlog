import type { Like } from "./Like"
import type { User } from "./User"

export type Comment = {
  id: string,
  entryId: String,
  userId: String,
  text: String,
  createdAt: Date,
  likes: Like[],
  _count: { likes: number },
  user: User,
}

