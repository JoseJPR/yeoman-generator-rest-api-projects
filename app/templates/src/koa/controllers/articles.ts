/**
 * Wrapper Articles Controllers
 * @description Wrapper class for define all bussines logic for articles.
 */

/** Import main dependences */
import Koa from 'koa';

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
   * @param {Koa.Context} ctx - ctx object of route.
   *
   */
  getAll = async (
    ctx: Koa.Context,
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
    ctx.status = code;
    ctx.body = response;
  }

  /**
   * @function getById
   *
   * @description Business logic for getById Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {Koa.Context} ctx - ctx object of route.
   *
   */
  getOne = async (
    ctx: Koa.Context,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: void;

    try {
      code = 200;
      response = await ServiceArticle.getOne(ctx.params.id);
    } catch (e) {
      code = 400;
      response = e;
    }
    // Set status and send of reply
    ctx.status = code;
    ctx.body = response;
  }

  /**
   * @function create
   *
   * @description Business logic for create Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {Koa.Context} ctx - ctx object of route.
   *
   */
  create = async (
    ctx: Koa.Context,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: void;

    try {
      code = 200;
      response = await ServiceArticle.create(ctx.request.body);
    } catch (e) {
      code = 400;
      response = e;
    }
    // Set status and send of reply
    ctx.status = code;
    ctx.body = response;
  }

  /**
   * @function update
   *
   * @description Business logic for deleteById Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {Koa.Context} ctx - ctx object of route.
   *
   */
  update = async (
    ctx: Koa.Context,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: void;

    try {
      code = 200;
      response = await ServiceArticle.update(ctx.params.id, ctx.request.body);
    } catch (e) {
      code = 400;
      response = e;
    }
    // Set status and send of reply
    ctx.status = code;
    ctx.body = response;
  }

  /**
   * @function delete
   *
   * @description Business logic for delete Article.
   *
   * @author Jose J Perez Rivas | @JoseJPR
   *
   * @param {Koa.Context} ctx - ctx object of route.
   *
   */
  delete = async (
    ctx: Koa.Context,
  ): Promise<void> => {
    // Declare main variables for set code number and respone object.
    let code: number;
    let response: void;

    try {
      code = 200;
      response = await ServiceArticle.delete(ctx.params.id);
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
