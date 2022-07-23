const signUpRules = {
  email: "required|email",
  password: "required|string|confirmed",
  password_confirmation: "required|string",
};
export default signUpRules;
