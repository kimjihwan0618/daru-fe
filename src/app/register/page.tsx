import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { registerPageStyles } from "./styles";

export default function RegisterPage() {
  return (
    <main className={registerPageStyles.root}>
      <RegisterForm />
    </main>
  );
}
