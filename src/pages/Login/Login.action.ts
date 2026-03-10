import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { apiClient } from "../../apiClient";

type AuthResponse = {
  accessToken: string;
};

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { accessToken } = await apiClient<AuthResponse>(
      "/auth",
      {
        method: 'post',
        body: JSON.stringify({ email, password }),
      }
    );

    localStorage.setItem("token", accessToken);
    return redirect("/account");
  } catch (err) {
    return { error: "Invalid email or password" };
  }

}
