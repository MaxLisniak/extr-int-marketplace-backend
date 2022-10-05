
// Update with your config settings.

const config = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: process.env.MYSQL_PASSWORD || "password",
      database: 'marketplace'
    }
  },

};

module.exports = config;
// export default config;
