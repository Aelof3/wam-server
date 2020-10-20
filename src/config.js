module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
  DB_URL: process.env.DB_URL || "postgresql://wam_admin:wam_pass@localhost/wam_db"
}
