const getCommentsByPostPaginatedRules = {
  post_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  query: "string",
  page: "string",
  entries_per_page: "string",
};

export default getCommentsByPostPaginatedRules;
