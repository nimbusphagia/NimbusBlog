import type { Block } from "./Block"
import type { Comment } from "./Comment"
import type { Like } from "./Like"
import type { User } from "./User"

export type Entry = {
  id: string,
  authorId: string,
  title: string,
  description?: string,
  publishedAt?: string,
  createdAt?: string,
  author?: User,
  blocks: Block[],
  likes: Like[],
  comments: Comment[]
  _count: { likes: number }
}
