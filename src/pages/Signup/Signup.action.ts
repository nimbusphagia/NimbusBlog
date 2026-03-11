import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { apiClient } from "../../apiClient";
import type { ActionError } from "../Account/Account.action";
import { login, loginAction } from "../Login/Login.action";

type AuthResponse = {
  accessToken: string;
};

function validatePassword(
  password?: string,
  confirmPassword?: string
): ActionError | null {
  if (!password) return { type: 'error', message: 'Password is required' };
  if (!confirmPassword) return { type: 'error', message: 'Please confirm your password' };
  if (password !== confirmPassword) return { type: 'error', message: "Passwords don't match" };
  if (password.length < 8) return { type: 'error', message: 'Password must be at least 8 characters' };
  return null;
}


export async function signupAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  try {
    const validationError = validatePassword(password, confirmPassword);
    if (validationError) return validationError;

    await apiClient<AuthResponse>(
      "/signup",
      {
        method: 'post',
        body: JSON.stringify({ name, email, password }),
      }
    );
    return login({ email, password });
  } catch (err) {
    return { error: "Invalid email or password" };
  }

}
