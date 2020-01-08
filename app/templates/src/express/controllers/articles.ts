/**
 * Wrapper Articles Controllers
 * @description Wrapper class for define all bussines logic for articles.
 */

/** Import main dependences */
import express from 'express';

/** Import all Services */
import ServiceArticle from '../services/articles';

class Main {
  /**
   * @function getAll
   *
   * @description Business logic for getAll Articles.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {express.Request} request - request object of route.
   * @param {express.Response} reply - reply object of route.
   *
   */
  getAll = async (
    request: express.Request,
    reply: express.Response,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: void;

    try {
      code = 200;
      response = await ServiceArticle.getAll();
    } catch (e) {
      code = 400;
      response = e;
    }
    // Set status and send of reply
    reply.status(code);
    reply.send(response);
  }

  /**
   * @function getById
   *
   * @description Business logic for getById Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {express.Request} request - request object of route.
   * @param {express.Response} reply - reply object of route.
   *
   */
  getOne = async (
    request: express.Request,
    reply: express.Response,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: void;

    try {
      code = 200;
      response = await ServiceArticle.getOne(request.params.id);
    } catch (e) {
      code = 400;
      response = e;
    }
    // Set status and send of reply
    reply.status(code);
    reply.send(response);
  }

  /**
   * @function create
   *
   * @description Business logic for create Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {express.Request} request - request object of route.
   * @param {express.Response} reply - reply object of route.
   *
   */
  create = async (
    request: express.Request,
    reply: express.Response,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: void;

    try {
      code = 200;
      response = await ServiceArticle.create(request.body);
    } catch (e) {
      code = 400;
      response = e;
    }
    // Set status and send of reply
    reply.status(code);
    reply.send(response);
  }

  /**
   * @function update
   *
   * @description Business logic for deleteById Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {express.Request} request - request object of route.
   * @param {express.Response} reply - reply object of route.
   *
   */
  update = async (
    request: express.Request,
    reply: express.Response,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: void;

    try {
      code = 200;
      response = await ServiceArticle.update(request.params.id, request.body);
    } catch (e) {
      code = 400;
      response = e;
    }
    // Set status and send of reply
    reply.status(code);
    reply.send(response);
  }

  /**
   * @function delete
   *
   * @description Business logic for delete Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {express.Request} request - request object of route.
   * @param {express.Response} reply - reply object of route.
   *
   */
  delete = async (
    request: express.Request,
    reply: express.Response,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: void;

    try {
      code = 200;
      response = await ServiceArticle.delete(request.params.id);
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
