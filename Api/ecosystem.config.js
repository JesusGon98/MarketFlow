module.exports = {
  apps: [
    {
      name: 'marketflow-api',
      script: 'dist/main.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
