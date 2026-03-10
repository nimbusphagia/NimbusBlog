import { redirect } from "react-router-dom";
import { apiClient } from "../../apiClient";
import type { User } from "../../types/User";

export async function accountLoader() {
  try {
    const user = await apiClient<User>("/me");
    return user;
  } catch (error) {
    console.log(error);
    return redirect("/login");
  }
}
