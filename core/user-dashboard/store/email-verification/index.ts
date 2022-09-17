export const state = () => ({
  email_verification: {} as any,
  verification_code: "",
});

export type EmailVerificationState = ReturnType<typeof state>;
