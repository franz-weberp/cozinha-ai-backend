//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  devStorage: {
    redis: { driver: 'redis' },
    db: { 
      driver: 'fs',
      base: '.data/db'
    }
  }
});
