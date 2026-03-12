import {
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import type { Block } from "../../types/Block";
import s from "./Entry.module.css";
import type { loaderProps } from "./Entry.loader";
import type { Comment } from "../../types/Comment";
import type { User } from "../../types/User";

export function EntryPage() {
  const { entry, user } = useLoaderData<loaderProps>();
  const [authorName, authorImg] = entry.author
    ? [entry.author.name, entry.author.imgUrl]
    : ["", ""];
  const fetcher = useFetcher();
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
            {user &&
              <fetcher.Form className={s.eLike} method="post">
                <button name="intent" value="toggleLikeOnEntry">
                  Like
                </button>
                <p>{entry._count.likes}</p>
              </fetcher.Form>
            }

          </div>
        </div>
      </div>

      <fetcher.Form method="post" className={`blueCard ${s.commentForm}`}>
        <h3>Leave a Comment</h3>
        {user && <input type="hidden" name="userId" value={user.id} />}
        <textarea name="newComment" rows={1} />
        <button name="intent" value="createComment" className="dashedCard">
          Submit
        </button>
      </fetcher.Form>

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
  user?: User;
  authorId: string,
};

function CommentItem({ c, user, authorId }: CommentProps) {
  const fetcher = useFetcher();

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
          <fetcher.Form className={s.cLike} method="post">
            <input type="hidden" name="commentId" value={c.id} />
            <button name="intent" value="toggleLikeOnComment">
              Like
            </button>
            <p>{c._count.likes}</p>
          </fetcher.Form>
          {(c.userId === user.id || user.role === "ADMIN" || user.id === authorId) && (
            <fetcher.Form className={s.cDelete} method="post">
              <input type="hidden" name="commentId" value={c.id} />
              <button name="intent" value="deleteComment">
                Delete
              </button>
            </fetcher.Form>
          )}
        </div>
      ) :
        (
          <div
            className={s.likeTool}
          >
            <p>Likes {c._count.likes}</p>
          </div>
        )}
    </div>
  );
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
