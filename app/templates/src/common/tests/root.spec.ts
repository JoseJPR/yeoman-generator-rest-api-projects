/** Include basic libraries. */
import 'pretty-console-colors';
const request = require('supertest')("http://localhost:3000");

describe('[ROOT]', () => {

  it(`[GET /]`, async () => {
    // Define request with url and method
    let _request = request.get("/");
    // Send request
    const result = await _request.send();

    // Define expect
    expect(typeof result.body).toBe("object");
  })
});
