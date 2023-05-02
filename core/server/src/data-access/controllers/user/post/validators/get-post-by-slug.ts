const getPostBySlugRules = {
  slug: ["required", "string"],
  user_id: ["regex:/^[0-9a-fA-F]{24}$/i"],
};

export default getPostBySlugRules;
