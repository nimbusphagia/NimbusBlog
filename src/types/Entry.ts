import type { Block } from "./Block"
import type { Comment } from "./Comment"
import type { Like } from "./Like"

export type Entry = {
  id: string,
  authorId: string,
  title: string,
  description?: string,
  publishedAt?: Date,
  createdAt?: Date,
  blocks: Block[],
  likes: Like[],
  comments: Comment[]
}
