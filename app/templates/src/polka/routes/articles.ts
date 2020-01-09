/**
 * Wrapper Articles Route
 * @description Wrapper class for define versions of Articles Route.
 */

/** Import main dependencies */
import polka from 'polka';

/** Import all Controllers */
import ControllerArticle from '../controllers/articles';

/** Import all Types */
import { ObjectType } from '../types/object';

/** Create router */
const Main: ObjectType = polka();

// Set Route with GET method.
Main.get('/', async (
  request: ObjectType,
  reply: ObjectType,
) => {
  await ControllerArticle.getAll(request, reply);
});

// Set Route with GET method.
Main.get('/:id', async (
  request: ObjectType,
  reply: ObjectType,
) => {
  await ControllerArticle.getOne(request, reply);
});

// Set Route with POST method.
Main.post('/', async (
  request: ObjectType,
  reply: ObjectType,
) => {
  await ControllerArticle.create(request, reply);
});

// Set Route with PUT method.
Main.put('/:id', async (
  request: ObjectType,
  reply: ObjectType,
) => {
  await ControllerArticle.update(request, reply);
});

// Set Route with DELETE method.
Main.delete('/:id', async (
  request: ObjectType,
  reply: ObjectType,
) => {
  await ControllerArticle.delete(request, reply);
});

export default Main;
