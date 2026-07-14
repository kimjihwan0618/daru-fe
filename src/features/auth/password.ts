import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 16;

export const passwordRuleChecks = {
  length: (password: string) =>
    password.length >= PASSWORD_MIN_LENGTH &&
    password.length <= PASSWORD_MAX_LENGTH,
  letter: (password: string) => /[A-Za-z]/.test(password),
  number: (password: string) => /\d/.test(password),
  specialCharacter: (password: string) =>
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password),
} as const;

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, "비밀번호는 8자 이상이어야 합니다.")
  .max(PASSWORD_MAX_LENGTH, "비밀번호는 16자 이하여야 합니다.")
  .refine(passwordRuleChecks.letter, "영문자를 1개 이상 포함해 주세요.")
  .refine(passwordRuleChecks.number, "숫자를 1개 이상 포함해 주세요.")
  .refine(
    passwordRuleChecks.specialCharacter,
    "특수문자를 1개 이상 포함해 주세요.",
  );

export function getPasswordRuleState(password: string) {
  return {
    length: passwordRuleChecks.length(password),
    letter: passwordRuleChecks.letter(password),
    number: passwordRuleChecks.number(password),
    specialCharacter: passwordRuleChecks.specialCharacter(password),
  };
}

export function isPasswordValid(password: string) {
  return passwordSchema.safeParse(password).success;
}
