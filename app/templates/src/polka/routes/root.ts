/**
 * Wrapper Root Route
 * @description Wrapper class for define versions of Root Route.
 */

/** Import main dependencies */
import polka from 'polka';

/** Import all Controllers */
import ControllerRoot from '../controllers/root';

/** Import all Types */
import { ObjectType } from '../types/object';

/** Create router */
const Main: ObjectType = polka();

// Set Route with GET method.
Main.get('/', async (
  request: ObjectType,
  reply: ObjectType,
) => {
  await ControllerRoot.handler(request, reply);
});

export default Main;
