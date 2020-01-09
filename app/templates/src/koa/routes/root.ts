/**
 * Wrapper Root Route
 * @description Wrapper class for define versions of Root Route.
 */

/** Import main dependencies */
import Koa from 'koa';
import Router from 'koa-router';

/** Import all Controllers */
import ControllerRoot from '../controllers/root';

const Main = (prefix): Koa.Middleware => {
  // Create route with prefix.
  const router: Router = new Router({
    prefix,
  });

  // Set Route with GET method.
  router.get('/', async (
    ctx: Koa.Context,
  ) => {
    await ControllerRoot.handler(ctx);
  });

  return router.routes();
};

export default Main;
