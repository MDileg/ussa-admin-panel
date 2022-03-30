module.exports = {
  apps: [
    {
      name: "ussa__admin",
      exec_mode: "cluster",
      instances: "1", // Or a number of instances
      // script: 'npm',
      // args: 'run dev',
      // script: 'node_modules/nuxt/bin/nuxt.js',
      // args: 'start',
      script: "node_modules/nuxt/bin/nuxt.js",
      args: "start --hostname 127.0.0.1 --port 8800"
    }
  ]
};
