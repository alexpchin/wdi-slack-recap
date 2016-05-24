module.exports = {
  env: process.env.NODE_ENV,
  slack_id: process.env.SLACK_ID,
  slack_secret: process.env.SLACK_SECRET,
  port: process.env.PORT || 3000,
  slack_client_secret: process.env.SLACK_CLIENT_SECRET
};
