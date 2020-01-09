/**
 * Wrapper Root Controllers
 * @description Wrapper class for define all bussines logic for root.
 */

/** Import main dependences */
import Koa from 'koa';

/** Import all Services */
import ServiceRoot from '../services/root';

/** Import all Types */
import { ObjectType } from '../types/object';

class Main {
  /**
   * @function handler
   *
   * @description Business logic for handler root.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {Koa.Context} ctx - ctx object of route.
   *
   */
  handler = async (
    ctx: Koa.Context,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: ObjectType = {};

    try {
      code = 200;
      response = await ServiceRoot.handler();
    } catch (e) {
      code = 400;
      response = e;
    }
    // Set status and send of reply
    ctx.status = code;
    ctx.body = response;
  }
}

export default new Main();
