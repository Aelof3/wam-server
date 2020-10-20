module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || "postgresql://wam_admin:wam_pass@localhost/wam_db",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://wam_admin:wam_pass@localhost/wam_db"
  //DATABASE_URL: process.env.DATABASE_URL || "postgres://grfdpibyfjadyc:647a2c8f7aa88937044ff7fa12124054b9e259dc3d074c65bb1a8efc49463aab@ec2-52-3-4-232.compute-1.amazonaws.com:5432/d1vppgo6jjurh"
}