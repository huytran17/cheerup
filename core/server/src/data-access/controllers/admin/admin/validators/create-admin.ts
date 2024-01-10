const createAdminRules = {
  email: "required|email",
  full_name: "required|string",
  type: "required|in:owner,collaborator,editor",
  password: "required|string|confirmed",
  password_confirmation: "required|string",
};

export default createAdminRules;
