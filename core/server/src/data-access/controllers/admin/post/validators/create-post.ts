const createPostRules = {
  title: "string",
  description: "string",
  content: "string",
  author: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  category: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default createPostRules;
