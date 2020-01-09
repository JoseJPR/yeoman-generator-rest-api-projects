/**
 * Wrapper Root Route
 * @description Wrapper class for define versions of Root Route.
 */

/** Import main dependencies */
import Koa from 'koa';
import Router from 'koa-router';

/** Import all Controllers */
import ControllerArticle from '../controllers/articles';

const Main = (prefix: string): Koa.Middleware => {
  // Create route with prefix.
  const router: Router = new Router({
    prefix,
  });

  // Set Route with GET method.
  router.get('/', async (
    ctx: Koa.Context,
  ) => {
    await ControllerArticle.getAll(ctx);
  });

  // Set Route with GET method.
  router.get('/:id', async (
    ctx: Koa.Context,
  ) => {
    await ControllerArticle.getOne(ctx);
  });

  // Set Route with POST method.
  router.post('/', async (
    ctx: Koa.Context,
  ) => {
    await ControllerArticle.create(ctx);
  });

  // Set Route with PUT method.
  router.put('/:id', async (
    ctx: Koa.Context,
  ) => {
    await ControllerArticle.update(ctx);
  });

  // Set Route with DELETE method.
  router.delete('/:id', async (
    ctx: Koa.Context,
  ) => {
    await ControllerArticle.delete(ctx);
  });

  return router.routes();
};

export default Main;
