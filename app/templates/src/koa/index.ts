/**
 * Wrapper Koa Application
 * @description Wrapper class for define versions of Koa Application.
 */

/** Import main dependences */
import dotenv from 'dotenv';
import fs from 'fs';
import Koa from 'koa';
import koaBody from 'koa-body';
import logger from 'koa-logger';

// Set config docenv by file.
dotenv.config();

/** Create Koa App */
const app: Koa = new Koa();
app.use(koaBody());
if (process.env.LOGGER && process.env.LOGGER === 'true') {
  app.use(logger());
}

/** Register all routes */
const registerRoutes = async (): Promise<void> => {
  // Load files ts or js of endpoints folder for create routes.
  const files = fs.readdirSync(`${__dirname}/config/endpoints`);
  files.forEach(async (file: string) => {
    try {
      // Get extension file for only load .js or .ts files.
      const ext = file.split('.');
      if (ext.length === 2 && process.env.EXTENSIONS.split(',').includes(ext[ext.length - 1])) {
        const endpoint = await import(`./config/endpoints/${file}`);
        const route = await import(`./routes/${endpoint.default[0].file}`);
        app.use(route.default(endpoint.default[0].prefix));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
};

/** Run the server! */
(async (): Promise<void> => {
  try {
    // Import all routes
    await registerRoutes();
    // Set port and host from enviroment vars.
    await app.listen(Number(process.env.PORT), process.env.HOST);
    console.info(`server listening on ${process.env.HOST} with port ${process.env.PORT}`);
  } catch (err) {
    console.error(err);
  }
})();
