const getPostRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  user_id: ["regex:/^[0-9a-fA-F]{24}$/i"],
};

export default getPostRules;
