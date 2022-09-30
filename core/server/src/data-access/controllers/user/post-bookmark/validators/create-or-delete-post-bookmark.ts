const createOrDeletePostBookmarkRules = {
  post: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  user: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default createOrDeletePostBookmarkRules;
