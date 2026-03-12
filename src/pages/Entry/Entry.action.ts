import { type ActionFunctionArgs } from "react-router-dom";
import { apiClient } from "../../apiClient";
import { accountLoader } from "../Account/Account.loader";
import type { User } from "../../types/User";
import type { Comment } from "../../types/Comment";

type ActionReturn = {
  action: "createComment" | "deleteComment" | "toggleLikeOnComment";
  id: string;
  message?: string;
};

export async function entryAction({
  request,
  params,
}: ActionFunctionArgs): Promise<ActionReturn> {
  const entryId = params.id;
  if (!entryId) throw new Error("Missing entry ID");

  const formData = await request.formData();
  const intent = formData.get("intent");
  const user = await accountLoader() as User;

  switch (intent) {
    case "createComment": {
      const text = formData.get("newComment");
      const comment = await apiClient<Comment>(
        `/users/${user.id}/entries/${entryId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({ text }),
        }
      );
      return {
        action: "createComment",
        id: comment.id,
        message: "Comment created",
      };
    }

    case "deleteComment": {
      const commentId = formData.get("commentId");
      if (!commentId || typeof commentId !== "string") {
        throw new Error("Missing or invalid comment ID");
      }
      await apiClient(
        `/users/${user.id}/entries/${entryId}/comments/${commentId}`,
        { method: "DELETE" }
      );
      return {
        action: "deleteComment",
        id: commentId,
        message: "Deleted successfully",
      };
    }

    case "toggleLikeOnComment": {
      const commentId = formData.get("commentId");
      if (!commentId || typeof commentId !== "string") {
        throw new Error("Missing or invalid comment ID");
      }
      const { liked } = await apiClient<{ liked: boolean }>(
        `/users/${user.id}/entries/${entryId}/comments/${commentId}/likes`,
        { method: "POST" }
      );
      return {
        action: "toggleLikeOnComment",
        id: commentId,
        message: liked === true ? "liked" : "disliked",
      };
    }
    case "toggleLikeOnEntry": {
      const { liked } = await apiClient<{ liked: boolean }>(
        `/users/${user.id}/entries/${entryId}/likes`,
        { method: "POST" }
      );
      return {
        action: "toggleLikeOnComment",
        id: entryId,
        message: liked === true ? "liked" : "disliked",
      };
    }

    default:
      throw new Error(`Unknown intent: "${intent}"`);
  }
}
