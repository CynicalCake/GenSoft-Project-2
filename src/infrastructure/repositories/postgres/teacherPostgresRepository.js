function createTeacherPostgresRepository(dbClient) {
  return {
    async create(teacher) {
      const query =
        "INSERT INTO teachers (full_name, email, institution_id) VALUES ($1, $2, $3) RETURNING id";
      const values = [teacher.fullName, teacher.email, teacher.institutionId];
      const result = await dbClient.query(query, values);
      return result.rows[0];
    },
  };
}

module.exports = {
  createTeacherPostgresRepository,
};
