import request from 'supertest'
import { signup } from '../controllers/authController'
import regeneratorRuntime from "regenerator-runtime";

  test('require email and password', async () => {
    expect.assertions(2)

   const req = { body: {} }
   const res = {
    status(status) {
       expect(status).toBe(400)
       return this
     },
     json(response) {
        expect(typeof response.message).toBe('string')
        
     }
   }

   await signup(req, res)

  })
