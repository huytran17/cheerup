const createSubscribeRules = {
  is_active: "boolean",
  user: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default createSubscribeRules;
