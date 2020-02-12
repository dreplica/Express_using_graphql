import { connect, disconnect, clearDatabase } from './mongoHandler'
import supertest from 'supertest'
import app from '../src/app'
const request = supertest(app);

beforeAll(()=>connect())
// afterEach(()=>clearDatabase())
afterAll(()=>disconnect())

describe("testing express server side", () => {
    test('on index page request, confirms db', async () => {
        const response = await request.get('/contact')
         expect(response.status).toBe(200);
    })
    test('test for getting user input', async () => {
        const response = await request.get('/contact/5e314e9a1c4e3eb6e4f40d6f')
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
    })

    test('test for posting data', async () => {
       const body = {
            Fname: "Aedo",
            Lname: "massi",
            Email: "String@dd.com",
            Phone: "2345696964"
                }
        const response = await  request.post('/contact').send(body)
        expect(response.status).toBe(200);
        expect(response.body).not.toEqual({});
    })

    test('test for put, and use an Id that doesnt exist', async () => {
        //get the id from the last test up
        //it would have been better if i was creating my own _id
        //so i can use it to query from the db and check if it exist then make the update

        //or just get an id from your database itself
        const body = {
            Fname: "Aedo",
            Lname: "massi",
        }
        const response = await request.put('/contact/5e2e30443a98c81c543d9618').send(body)
        expect(response.status).toBe(404);
        expect(response.body).not.toBe({});
    })
})

