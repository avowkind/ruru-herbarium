if (typeof window === 'undefined') {
  /**
   * Settings exposed to the server.
   */
  module.exports = {
    // Deployment Info
    HOST: process.env.HOST || process.env.WEB_URI || 'http://localhost:3141',

    // Database & Storage
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'ruruherbarium'

  }
} else {
  /**
   * Settings exposed to the client.
   */
  module.exports = {
    CLIENT: true,
    // Deployment Info
    HOST: process.env.HOST || process.env.WEB_URI || 'http://localhost:3141'

  }
}
