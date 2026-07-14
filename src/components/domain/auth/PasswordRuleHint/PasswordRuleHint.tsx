import { Check, Circle } from "lucide-react";
import { getPasswordRuleState } from "@/app/(page)/type/password";
import { passwordRuleItemVariants, passwordRuleStyles } from "./styles";

const rules = [
  { key: "length", label: "8~16자" },
  { key: "letter", label: "영문자" },
  { key: "number", label: "숫자" },
  { key: "specialCharacter", label: "특수문자" },
] as const;

export function PasswordRuleHint({ password }: { password: string }) {
  const state = getPasswordRuleState(password);

  return (
    <ul className={passwordRuleStyles.root} aria-label="비밀번호 조건">
      {rules.map(({ key, label }) => {
        const isValid = state[key];
        return (
          <li key={key} className={passwordRuleItemVariants({ isValid })}>
            {isValid ? <Check size={13} /> : <Circle size={10} />}
            {label}
          </li>
        );
      })}
    </ul>
  );
}
