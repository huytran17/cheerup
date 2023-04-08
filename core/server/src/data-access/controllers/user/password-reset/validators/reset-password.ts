const resetPasswordRules = {
  verification_token: ["required", "string"],
  password: ["required", "string"],
  password_confirmation: ["required", "string"],
};

export default resetPasswordRules;
