export const getLimitOffset = (args) => {
  const { page = 1, limit = 20 } = args;
  const offset = page - 1;
  return { limit: limit < 0 ? 0 : limit, offset: offset < 0 ? 0 : offset };
};
