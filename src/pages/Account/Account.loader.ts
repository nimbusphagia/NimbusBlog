import { redirect } from "react-router-dom";
import { apiClient } from "../../apiClient";
import type { User } from "../../types/User";

export async function accountLoader(): Promise<User | Response> {
  try {
    const current = await apiClient<User>("/me");
    const user = await apiClient<User>(`/public/users/${current.id}`)
    return user;
  } catch (error) {
    console.log(error);
    return redirect("/login");
  }
}
