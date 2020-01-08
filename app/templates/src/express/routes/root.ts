/**
 * Wrapper Root Route
 * @description Wrapper class for define versions of Root Route.
 */

/** Import main dependencies */
import express from 'express';

/** Import all Controllers */
import ControllerRoot from '../controllers/root';

/** Create router */
const Main: express.Router = express.Router();

// Set Route with GET method.
Main.get('/', async (
  request: express.Request,
  reply: express.Response,
) => {
  await ControllerRoot.handler(request, reply);
});

export default Main;
