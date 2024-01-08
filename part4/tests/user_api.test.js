const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('badpassword123', 10)
    const userObject = new User({
        username: 'jesse16',
        user: 'jesse hantula',
        passwordHash: passwordHash
    })
    await userObject.save()
})

test('username must be atleast 3 characters', async () => {
    const newUser = {
        username: 'je',
        user: 'jesse',
        password: 'salasana'
    }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

test('username must be unique', async () => {
    const newUser = {
        username: 'jesse16',
        user: 'jesse',
        password: 'salasana'
    }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

test('password must be atleast 3 characters', async () => {
    const newUser = {
        username: 'jesse16swag',
        user: 'jesse',
        password: 'sa'
    }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})
