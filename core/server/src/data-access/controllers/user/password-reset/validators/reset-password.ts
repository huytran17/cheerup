const resetPasswordRules = {
  password: "required|string|min:8|max:255|confirmed",
  password_confirmation: "required|min:8|max:255|string",
};

export default resetPasswordRules;
