import { type ActionFunctionArgs } from "react-router-dom";
import { apiClient } from "../../apiClient";
import { accountLoader } from "../Account/Account.loader";
import type { User } from "../../types/User";

export async function entryAction({ request, params }: ActionFunctionArgs) {
  try {
    const entryId = params.id;
    const formData = await request.formData();
    const intent = formData.get('intent');
    const user = await accountLoader() as User;
    switch (intent) {
      case 'newComment': {
        const comment = formData.get('newComment');
        await apiClient(
          `/users/${user.id}/entries/${entryId}/comments`,
          {
            method: 'POST',
            body: JSON.stringify({ text: comment })
          });
        return null;
      }
      case 'deleteComment': {
        const commentId = formData.get('commentId');
        await apiClient(
          `/users/${user.id}/entries/${entryId}/comments/${commentId}`,
          {
            method: 'DELETE',
          }
        );
        return null;
      }
    }
  } catch (error) {
    throw error;
  }
}

