module.exports = {
  apps: [
    {
      name: 'marketflow-api',
      script: 'dist/src/main.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
