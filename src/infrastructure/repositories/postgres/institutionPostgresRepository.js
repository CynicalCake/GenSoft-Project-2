function createInstitutionPostgresRepository(dbClient) {
  return {
    async findByName(name) {
      const query =
        "SELECT id, name FROM institutions WHERE LOWER(name) = LOWER($1) LIMIT 1";
      const result = await dbClient.query(query, [name]);
      return result.rows[0] || null;
    },

    async create(institution) {
      const query =
        "INSERT INTO institutions (name) VALUES ($1) RETURNING id, name";
      const result = await dbClient.query(query, [institution.name]);
      return result.rows[0];
    },
  };
}

module.exports = {
  createInstitutionPostgresRepository,
};
