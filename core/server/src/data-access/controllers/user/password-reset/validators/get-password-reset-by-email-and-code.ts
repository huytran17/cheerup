const getPasswordResetByEmailAndCodeRules = {
  email: ["required", "string"],
  security_code: ["required", "string"],
};

export default getPasswordResetByEmailAndCodeRules;
