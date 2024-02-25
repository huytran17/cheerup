const createAdminRules = {
  email: "required|email",
  full_name: "required|string",
  type: "required|in:owner,collaborator,editor",
  password: "required|string|min:8|max:255|confirmed",
  password_confirmation: "required|string|min:8|max:255",
};

export default createAdminRules;
