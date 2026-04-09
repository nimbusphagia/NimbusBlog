# NimbusBlog

The public-facing frontend of a full-stack blogging platform. Readers can browse posts, like their favorites, and leave comments — all consuming a shared REST API also used by the author-side dashboard, [NimbusBlogger](https://github.com/nimbusphagia/NimbusBlogger).

🌐 **[Live demo](https://nimbus-blog.vercel.app/)**

---

## Features

- 📝 **Read posts** — clean reading experience for published articles
- ❤️ **Likes** — readers can like posts
- 💬 **Comments** — leave comments on any post
- 🕐 **Most recent** — browse the latest published content
- 🔥 **Most liked** — discover the most popular posts

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, TypeScript, Vite |
| API | Node.js REST API (shared with NimbusBlogger) |
| Deployment | Vercel |

---

## Related

This repo is the reader-facing side of a two-frontend architecture:

- **NimbusBlog** (this repo) — public reader interface
- **[NimbusBlogger](https://github.com/nimbusphagia/NimbusBlogger)** — author dashboard for creating and managing posts

Both frontends consume the same backend API, reflecting a real-world pattern where different user roles have separate, purpose-built interfaces.

---

## Author

**Ignacio** · [GitHub](https://github.com/nimbusphagia)
