const app = require('../src/app')
const request = require('supertest')

describe('Users endpoints', () => {
  it('post request to /users should create a user', async () => {
    const userToCreate = {
      name: 'SomeName' + Date.now(),
      age: 27,
      bio: 'Been There. Done That.',
    }

    const createdUser = (await request(app).post('/users').send(userToCreate)).body
    expect(createdUser.name).toBe(userToCreate.name)
    expect(createdUser.age).toBe(userToCreate.age)
    expect(createdUser.bio).toBe(userToCreate.bio)
  })

  it('get request to /users should list users', async () => {
    const userList = (await request(app).get('/users')).body
    const usersExist = userList.length > 0

    expect(usersExist).toBe(true)
  })

  it('user should be able to like a event', async () => {
    // create a event
    const event = (await request(app).post('/events').send({ filename: 'coyotivtestingsession.png' })).body
    console.log('-------------event--', event)

    // create a user
    const userWithEvent = (
      await request(app)
        .post('/users')
        .send({
          name: 'EventOwnerUser' + Date.now(),
          age: 27,
          bio: 'Someone sharing events.',
        })
    ).body
    console.log('-------------userWithEvent--', userWithEvent)

    // add the event to that user
    await request(app).post(`/users/${userWithEvent._id}/adds`).send({ eventId: event._id })

    // create another user
    const likerUser = {
      name: 'Liker User' + Date.now(),
      age: 36,
      bio: 'Someone liking events.',
    }

    const createdLikerUser = (await request(app).post('/users').send(likerUser)).body
    console.log('-------------createdLikerUser--', createdLikerUser)

    // like the event with that another user
    await request(app).post(`/users/${createdLikerUser._id}/likes`).send({ eventId: event._id })

    const finalEventUser = (await request(app).get(`/users/${userWithEvent._id}/json`)).body
    console.log('-------------finalEventUser--', finalEventUser)

    const finalLikerUser = (await request(app).get(`/users/${createdLikerUser._id}/json`)).body
    console.log('-------------finalLikerUser--', finalLikerUser)

    expect(finalEventUser.events.length).toBe(1)
    expect(finalLikerUser.likes.length).toBe(1)

    console.log('finalEventUser.events[0].likedBy[0]._id', finalEventUser.events[0].likedBy[0]._id)

    expect(finalEventUser.events[0].likedBy[0]._id).toBe(finalLikerUser._id)
    expect(finalLikerUser.likes[0]).toBe(finalEventUser.events[0]._id)
  })
})
