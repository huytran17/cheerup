const signUpRules = {
  email: "required|email",
  full_name: "required|string",
  password: "required|string|confirmed",
  password_confirmation: "required|string",
};
export default signUpRules;
