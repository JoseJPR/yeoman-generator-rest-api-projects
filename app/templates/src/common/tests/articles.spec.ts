/** Include basic libraries. */
import 'pretty-console-colors';
const request = require('supertest')('http://localhost:3000');

describe('[ARTICLES]', () => {

  it(`[GET -> /]`, async () => {
    // Define request with url and method
    let _request = request.get('/articles');
    // Send request
    const result = await _request.send();

    // Define expect
    expect(result.status).toBe(200);
    expect(typeof result.body).toBe('object');
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          resume: expect.any(String),
          excerpt: expect.any(String),
          createdAt: expect.any(Number),
          updatedAt: expect.any(Number),
          _id: expect.any(String),
          _rev: expect.any(String)
        })
      ])
    );
  });
});