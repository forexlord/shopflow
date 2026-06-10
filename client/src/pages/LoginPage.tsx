import { LoginForm } from "../features/auth/components/LoginForm/LoginForm";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
