module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || "postgresql://wam_admin:wam_pass@localhost/wam_db",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://wam_admin:wam_pass@localhost/wam_db"
}