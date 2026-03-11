import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { apiClient } from "../../apiClient";

type AuthResponse = {
  accessToken: string;
};
type loginArgs = {
  email: string,
  password: string,
}
export async function login({ email, password }: loginArgs) {
  const { accessToken } = await apiClient<AuthResponse>(
    "/auth",
    {
      method: 'post',
      body: JSON.stringify({ email, password }),
    }
  );

  localStorage.setItem("token", accessToken);
  return redirect("/account");

}
export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    return await login({ email, password })
  } catch (err) {
    return { error: "Invalid email or password" };
  }

}
