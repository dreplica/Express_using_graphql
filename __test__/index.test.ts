import supertest from 'supertest';
import { db, sql } from '../src/Models/contact-postgres'
import pgSetup from '@databases/pg-test/jest/globalSetup';
import pgTeardown from '@databases/pg-test/jest/globalTeardown';
import app from '../src/app';

const request = supertest(app)

beforeAll(() => pgSetup())
afterEach(()=>pgTeardown())

type Register = {
      email: string,
      password: string,
      fname: string,
      lname: string,
      username:string
}
describe("running five test to test basic functionalities", () => {
    test("to check if the end point is going,sending bad request", async (done) => {
        request.get('/api/contacts')
            .expect('Content-Type', /text\/html; charset=utf-8/)
            .expect(404)
          .end(function (err, res) {
              if (err) throw err;
              done()
  })
    })
  test("to check if signing is going", async (done) => {
    const signin = {
      email: "adejo.david@decagon.dev",
      password:"sharingan"
      }
      request.post('/user/signin')
          .send(signin)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200)
          .end(function (err, res) {
              if (err) throw err;
              done()
  })
    })
  test("to check if signing is bad", async (done) => {
    const signin = {
      email: "adejoavi@decagon.dev",
      password:"sharan"
      }
      request.post('/user/signin')
          .send(signin)
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(404)
          .end(function (err, res) {
              if (err) throw err;
              done()
  })
    })
  test("to check if signup is going", async (done) => {
    console.log("checking if signup is good")
    const signup:Register = {
      email: "aad.vvid@deon.com",
      password: "sharingan",
      fname: "jamaica",
      lname: "holliwood",
      username:"useame"
}
      request.post('/user/signup')
          .send(signup)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200)
          .end(function (err, res) {
              if (err) throw err;
              done()
          })
    console.log("finished checking if signup is going")
    })
  test("to check if signup is bad", async (done) => {
    const badSign = {
      email: "adoavid@decagon.dev",
      password:"sharingan"
      }
      request.post('/user/signup')
        .send(badSign)
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(404)
          .end(function (err, res) {
              if (err) throw err;
              done()
  })
    })
    // test("to check if database is working", async (done) => {
    //   pgSetup()
    //   const [{email:dat}] = await db.query(sql`Select email from users Where id = 'd39e49e8-de57-4914-bd82-f01036fcc873'`)
    //   expect(dat).toBe("body@body.com")
    //   pgTeardown()
    // })
})