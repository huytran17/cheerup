const signInRules = {
  email: "required|email",
  password: "required|string|min:8|max:255|confirmed",
};
export default signInRules;
