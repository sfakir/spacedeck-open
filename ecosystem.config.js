module.exports = {
  apps : [{
    name      : 'spacedeck-open',
    script    : 'spacedeck.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }]
};
