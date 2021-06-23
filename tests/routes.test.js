const request = require('supertest')
const headers = { authorization: "abc" };
const app = require('../app/routes/approutes')
describe('Post Endpoints', () => {
  it('should fetch a post', async () => {
    const res = await request(app)
      .get('/api/user/posts')
      .set(headers)
      .set({
            "message": "TDD - Test Deriven Development.",
            "username" : "user"            
      })
    expect(res.statusCode).toEqual(200)
  },30000)
})