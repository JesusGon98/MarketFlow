module.exports = {
  apps: [
    {
      name: 'marketflow-frontend',
      script: 'dist/saldos-online-frontend/server/server.mjs',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],
};
