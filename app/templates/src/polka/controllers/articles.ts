/**
 * Wrapper Articles Controllers
 * @description Wrapper class for define all bussines logic for articles.
 */

/** Import all Services */
import ServiceArticle from '../services/articles';

/** Import all Types */
import { ObjectType } from '../types/object';

class Main {
  /**
   * @function getAll
   *
   * @description Business logic for getAll Articles.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {ObjectType} request - request object of route.
   * @param {ObjectType} reply - reply object of route.
   *
   */
  getAll = async (
    request: ObjectType,
    reply: ObjectType,
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
    reply.writeHead(code, { 'Content-Type': 'application/json' });
    reply.end(JSON.stringify(response));
  }

  /**
   * @function getById
   *
   * @description Business logic for getById Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {ObjectType} request - request object of route.
   * @param {ObjectType} reply - reply object of route.
   *
   */
  getOne = async (
    request: ObjectType,
    reply: ObjectType,
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
    reply.writeHead(code, { 'Content-Type': 'application/json' });
    reply.end(JSON.stringify(response));
  }

  /**
   * @function create
   *
   * @description Business logic for create Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {ObjectType} request - request object of route.
   * @param {ObjectType} reply - reply object of route.
   *
   */
  create = async (
    request: ObjectType,
    reply: ObjectType,
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
    reply.writeHead(code, { 'Content-Type': 'application/json' });
    reply.end(JSON.stringify(response));
  }

  /**
   * @function update
   *
   * @description Business logic for deleteById Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {ObjectType} request - request object of route.
   * @param {ObjectType} reply - reply object of route.
   *
   */
  update = async (
    request: ObjectType,
    reply: ObjectType,
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
    reply.writeHead(code, { 'Content-Type': 'application/json' });
    reply.end(JSON.stringify(response));
  }

  /**
   * @function delete
   *
   * @description Business logic for delete Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {ObjectType} request - request object of route.
   * @param {ObjectType} reply - reply object of route.
   *
   */
  delete = async (
    request: ObjectType,
    reply: ObjectType,
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
    reply.writeHead(code, { 'Content-Type': 'application/json' });
    reply.end(JSON.stringify(response));
  }
}

export default new Main();
