module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: env('DATABASE_CLIENT'),
        username: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        database: env('DATABASE_NAME'),
        port: env.int('DATABASE_PORT'),
        filename: env('DATABASE_FILENAME')
      },
      options: {
        useNullAsDefault: true
      }
    }
  }
})
