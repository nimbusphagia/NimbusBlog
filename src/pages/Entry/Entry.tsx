import {
  useFetcher,
  useLoaderData,
  NavLink
} from "react-router-dom";
import type { Block } from "../../types/Block";
import s from "./Entry.module.css";
import type { loaderProps } from "./Entry.loader";
import type { Comment } from "../../types/Comment";
import type { User } from "../../types/User";
import type { Like } from "../../types/Like";
import { Heart, Trash2 } from "lucide-react";

export function EntryPage() {
  const { entry, user } = useLoaderData<loaderProps>();
  const [authorName, authorImg] = entry.author
    ? [entry.author.name, entry.author.imgUrl]
    : ["", ""];
  const likeFetcher = useFetcher();
  const commentFetcher = useFetcher();
  const formattedDate = entry.publishedAt
    ? new Date(entry.publishedAt).toLocaleString()
    : "";

  return (
    <div className={s.body}>
      <div className={`blueCard ${s.entry}`}>
        <header className={s.eHeader}>
          <h2>{entry.title}</h2>
        </header>
        <main className={s.blocks}>
          {entry.blocks.map((block: Block) => {
            const type = block.blockType;
            const isHeading = type === "HEADING";
            const isText = type === "TEXT";
            const isImg = type === "IMAGE";
            const className = isHeading
              ? s.blockHeading
              : isText
                ? s.blockText
                : s.blockImg;
            return (
              <div key={block.id} className={className}>
                {isHeading && <Heading block={block} />}
                {isText && <Text block={block} />}
                {isImg && <Img block={block} />}
              </div>
            );
          })}
        </main>
        <div className={s.eFooter}>
          <div className={s.entryInfo}>
            <div className={s.userInfo}>
              <img src={authorImg} alt="" />
              <p>{authorName}</p>
            </div>
            <p className={s.entryDate}>{formattedDate}</p>
          </div>
          <div className={s.entryActions}>
            {user ?
              <likeFetcher.Form className={s.eLike} method="post">
                <button name="intent" value="toggleLikeOnEntry">
                  <EntryHeart
                    user={user}
                    id={entry.id}
                  />
                </button>
                <p>{entry._count.likes}</p>
              </likeFetcher.Form>
              :
              <div
                className={s.eLike}>
                <EntryHeart
                  user={null}
                  id={entry.id} />
                <p>{entry._count.likes}</p>
              </div>
            }

          </div>
        </div>
      </div>
      {user ?
        <commentFetcher.Form
          method="post"
          className={`blueCard ${s.commentForm}`}
          key={commentFetcher.state === "idle" ? "idle" : "submitting"}
        >
          <h3>Leave a Comment</h3>
          {user && <input type="hidden" name="userId" value={user.id} />}
          <textarea name="newComment" rows={1} />
          <button name="intent" value="createComment" className="dashedCard">
            {commentFetcher.state !== "idle" ? "Submitting..." : "Submit"}
          </button>
        </commentFetcher.Form>
        :
        <div
          className={`blueCard ${s.loginPrompt}`}
        >
          <p>Wanna leave a comment and interact with posts?</p>
          <NavLink
            to='/account'
            className={`dashedCard ${s.loginLink}`}
          >Login</NavLink>
        </div>
      }
      <div className={`blueCard ${s.comments}`}>
        {entry.comments.length ? (
          entry.comments.map((c) => (
            <CommentItem key={c.id} c={c} user={user} authorId={entry.authorId} />
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}

type CommentProps = {
  c: Comment;
  user?: User | null;
  authorId: string,
};

function CommentItem({ c, user, authorId }: CommentProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== 'idle';

  return (
    <div className={`dashedCard ${s.comment}`}>
      <div className={s.cInfo}>
        <div className={s.userInfo}>
          <img src={c.user.imgUrl} alt="" />
          <p>{c.user.name}</p>
        </div>
        <div className={s.cBody}>
          <p>{c.text}</p>
        </div>
      </div>
      {user ? (
        <div className={s.cActions}>

          {(c.userId === user.id || user.role === "ADMIN" || user.id === authorId) && (
            <fetcher.Form className={s.cDelete} method="post">
              <input type="hidden" name="commentId" value={c.id} />
              <button
                name="intent"
                value="deleteComment"
                disabled={isSubmitting}
              >
                <Trash2 />
              </button>
            </fetcher.Form>
          )}
          <fetcher.Form className={s.cLike} method="post">
            <input type="hidden" name="commentId" value={c.id} />
            <button
              name="intent"
              value="toggleLikeOnComment"
              disabled={isSubmitting}
            >

              <CommentHeart
                user={user}
                id={c.id}
                fetcher={fetcher}
              />
            </button>
            <p>{c._count.likes}</p>
          </fetcher.Form>
        </div>
      ) :
        (
          <div
            className={s.cLike}
          >
            <CommentHeart
              user={null}
              id={c.id}
              fetcher={fetcher}
            />
            <p>{c._count.likes}</p>
          </div>
        )}
    </div>
  );
}
type HeartProps = {
  user: User | null,
  id: string,
  fetcher?: ReturnType<typeof useFetcher>
}
function CommentHeart({ user, id, fetcher }: HeartProps) {
  {
    const currentlyLiked = user?.likes?.some(
      (like: Like) => like.commentId === id && like.userId === user.id
    ) ?? false;
    const isLikeSubmission = fetcher?.formData?.get("intent") === "toggleLikeOnComment";
    const isOptLiked = isLikeSubmission
      ? !currentlyLiked
      : currentlyLiked;
    return (
      <Heart
        size={20}
        fill={isOptLiked ? "var(--red1)" : "none"}
        stroke={isOptLiked ? "var(--red1)" : "gray"}
      />
    )
  }
}
function EntryHeart({ user, id, fetcher }: HeartProps) {
  {
    const currentlyLiked = user?.likes?.some(
      (like: Like) => like.entryId === id && like.userId === user.id
    ) ?? false;
    const isOptLiked = fetcher?.formData
      ? !currentlyLiked
      : currentlyLiked;
    return (
      <Heart
        size={20}
        fill={isOptLiked ? "red" : "none"}
        stroke={isOptLiked ? "red" : "gray"} />
    )
  }
}

function Text({ block }: { block: Block }) {
  return <p>{block.text}</p>;
}

function Img({ block }: { block: Block }) {
  return <img src={block.mediaSrc} alt="" />;
}

function Heading({ block }: { block: Block }) {
  return <h3>{block.text}</h3>;
}
