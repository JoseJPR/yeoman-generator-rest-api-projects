/**
 * Wrapper Root Controllers
 * @description Wrapper class for define all bussines logic for root.
 */

/** Import main dependences */
import express from 'express';

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
   * @param {express.Request} request - request object of route.
   * @param {express.Response} reply - reply object of route.
   * @param {express.NextFunction} next - next function of route.
   *
   */
  handler = async (
    request: express.Request,
    reply: express.Response,
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
    reply.status(code);
    reply.send(response);
  }
}

export default new Main();
