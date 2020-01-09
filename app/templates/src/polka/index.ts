/**
 * Wrapper Koa Application
 * @description Wrapper class for define versions of Koa Application.
 */

/** Import main dependences */
import dotenv from 'dotenv';
import fs from 'fs';
import polka from 'polka';
import bodyParser from 'body-parser';

/** Import all Types */
import { ObjectType } from './types/object';

// Set config docenv by file.
dotenv.config();

/** Create Polka App */
const app: ObjectType = polka();
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.LOGGER && process.env.LOGGER === 'true') {
  app.use((request: ObjectType, res: ObjectType, next: any) => {
    console.log(`Received ${request.method} on ${request.url}`);
    next();
  });
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
        /**
         * With polka we need to replace the value "/" with "" for the root endpoint.
         * More info: https://github.com/lukeed/polka/issues/107
         */
        app.use(endpoint.default[0].prefix === '/' ? '' : endpoint.default[0].prefix, route.default);
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
