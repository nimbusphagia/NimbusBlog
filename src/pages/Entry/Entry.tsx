import { useFetcher, useLoaderData } from 'react-router-dom'
import type { Block } from '../../types/Block'
import s from './Entry.module.css'
import type { loaderProps } from './Entry.loader'
import type { Comment } from '../../types/Comment'
import type { User } from '../../types/User'
import { useState } from 'react'

export function EntryPage() {
  const { entry, user } = useLoaderData<loaderProps>();
  const [authorName, authorImg] = entry.author ? [entry.author.name, entry.author.imgUrl] : ['', ''];
  const fetcher = useFetcher();
  const [comments, setComments] = useState(entry.comments);

  const formattedDate = entry.publishedAt
    ? new Date(entry.publishedAt).toLocaleString()
    : "";
  return (
    <div className={s.body}>

      <div className={`blueCard ${s.entry}`}>
        <header className={s.eHeader}>
          <h2>
            {entry.title}
          </h2>

        </header>
        <main className={s.blocks}>
          {entry.blocks.map((block: Block) => {
            const type = block.blockType;
            const isHeading = type === 'HEADING';
            const isText = type === 'TEXT';
            const isImg = type === 'IMAGE';
            const className = isHeading ? s.blockHeading : (isText ? s.blockText : s.blockImg);
            return (
              <div
                key={block.id}
                className={className}
              >
                {isHeading && <Heading block={block} />}
                {isText && <Text block={block} />}
                {isImg && <Img block={block} />}
              </div>
            )
          })}
        </main>
        <div
          className={`${s.eFooter}`}
        >
          <div className={s.entryInfo}>
            <div
              className={s.userInfo}
            >
              <img src={authorImg} alt="" />
              <p>
                {authorName}
              </p>

            </div >
            <p className={s.entryDate}>
              {formattedDate}
            </p>

          </div>
          <div className={s.entryActions}>
            <button
              type='button'
            >
              Like
            </button>
          </div>
        </div>

      </div>
      <fetcher.Form
        method='post'
        className={`blueCard ${s.commentForm}`}>
        <h3>Leave a Comment</h3>
        {user && <input type="hidden" name='userId' value={user.id} />
        }
        <textarea
          name='newComment'
          rows={1}></textarea>
        <button
          name='intent'
          value='newComment'
          className='dashedCard'
        >Submit</button>

      </fetcher.Form>
      <div
        className={`blueCard ${s.comments}`}
      >
        {comments.length ? comments.map((c) =>
          <Comment
            key={c.id}
            c={c}
            user={user}
            onDelete={(id) =>
              setComments(prev => prev.filter(c => c.id !== id))
            }
          />
        ) : <p>No comments yet</p>}
      </div>
    </div >
  )
}

type commentProps = {
  c: Comment,
  user?: User,
  onDelete: (id: string) => void,
}

function Comment({ c, user, onDelete }: commentProps) {
  const fetcher = useFetcher();
  return (
    <div
      className={`dashedCard ${s.comment}`}
    >
      <div
        className={s.cInfo}
      >
        <div
          className={`${s.userInfo}`}
        >
          <img src={c.user.imgUrl} alt="" />
          <p>{c.user.name}</p>
        </div>
        <div
          className={s.cBody}
        >
          <p>
            {c.text}
          </p>
        </div>

      </div>
      {user &&
        <div
          className={s.cActions}
        >

          <fetcher.Form
            className={s.cLike}
            method='post'
          >
            <input
              type="hidden"
              name='commentId'
              value={c.id}
            />
            <p>{c._count.likes || '0'}</p>
            <button
              name='intent'
              value='toggleCommentLike'
            >Like</button>
          </fetcher.Form>
          {(c.userId === user.id) && <fetcher.Form
            className={s.cDelete}
            method='post'
          >
            <input
              type="hidden"
              name='commentId'
              value={c.id}
            />
            <button
              name='intent'
              value='deleteComment'
              onClick={() => onDelete(c.id)}
            >Delete</button>
          </fetcher.Form>
          }
        </div>
      }
    </div>
  )
}
function Text({ block }: { block: Block }) {
  return (
    <p
    >
      {block.text}
    </p>
  )
}
function Img({ block }: { block: Block }) {
  return (
    <img
      src={block.mediaSrc}
      alt=''
    />
  )
}
function Heading({ block }: { block: Block }) {
  return (
    <h3
    >
      {block.text}
    </h3>
  )
}


