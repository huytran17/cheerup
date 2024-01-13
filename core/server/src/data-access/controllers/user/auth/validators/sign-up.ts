const signUpRules = {
  email: "required|email",
  full_name: "required|string",
  password: "required|string|min:8|max:255|confirmed",
  password_confirmation: "required|min:8|max:255|string",
};
export default signUpRules;
