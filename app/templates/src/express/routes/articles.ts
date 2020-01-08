/**
 * Wrapper Articles Route
 * @description Wrapper class for define versions of Articles Route.
 */

/** Import main dependencies */
import express from 'express';

/** Import all Controllers */
import ControllerArticle from '../controllers/articles';

/** Create router */
const Main: express.Router = express.Router();

// Set Route with GET method.
Main.get('/', async (
  request: express.Request,
  reply: express.Response,
) => {
  await ControllerArticle.getAll(request, reply);
});

// Set Route with GET method.
Main.get('/:id', async (
  request: express.Request,
  reply: express.Response,
) => {
  await ControllerArticle.getOne(request, reply);
});

// Set Route with POST method.
Main.post('/', async (
  request: express.Request,
  reply: express.Response,
) => {
  await ControllerArticle.create(request, reply);
});

// Set Route with PUT method.
Main.put('/:id', async (
  request: express.Request,
  reply: express.Response,
) => {
  await ControllerArticle.update(request, reply);
});

// Set Route with DELETE method.
Main.delete('/:id', async (
  request: express.Request,
  reply: express.Response,
) => {
  await ControllerArticle.delete(request, reply);
});

export default Main;
