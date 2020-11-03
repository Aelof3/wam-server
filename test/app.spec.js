const knex = require('knex')
const app = require('../src/app')
const testHelper = require('./testHelper')

describe('WAM-Router Endpoints', function () {
  let db

  const testScores = testHelper.createTestScores()
  const testAuths = testHelper.createTestAuth()

  before('Setup knex connection',() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db',db)
  })

  after('disconnect from db',() => db.destroy())
  
  before('cleanup', () => testHelper.cleanTables(db))

  afterEach('cleanup', () => testHelper.cleanTables(db))

  describe('GET /', () => {
    context('Only context', () => {
      it('returns the single string', () => {
        return supertest(app)
          .get('/')
          .retry(1)
          .expect(200, 'Whack a mole... 3d!')
      })
    })
  })

  describe('GET /auth', () => {
    context('Request api token', () => {
      it('should return a unique token with length greater than 0', () => {
        return supertest(app)
          .get('/auth')
          .expect(200)
          .expect(res => {
            expect(testHelper.checkToken(res.body.authtoken)).to.be.true
          })
      })
    })
  })

  describe('GET /scores', () => {

    beforeEach('add scores', () => testHelper.insertScores(db,testScores))

    context('Request scores', () => {
      it('should contain list of all scores added to the db', () => {
        return supertest(app)
          .get('/scores')
          .expect(200)
          .expect(res => {
            expect(testHelper.checkScores(testScores,res.body)).to.be.true
          })
      })
    })
  })

  describe('POST /scores', () => {

    beforeEach('add scores', () => testHelper.insertScores(db,testScores))
    beforeEach('add auth', () => testHelper.insertAuth(db,testAuths))
    
    const testScore = {
      user_name: 'testScore',
      score: 105,
      authtoken: 'testtoken4'
    }

    const testAuth = {
      authtoken: 'testtoken4',
      score: 105,
      points: 100
    }

    const b = true

    context('Create score', () => {
      it('score is added to the database', () => {
        return supertest(app)
          .post('/auth')
          .type('application/json')
          .send(JSON.stringify(testAuth))
          .expect(201)
          .then(r=>{
            return supertest(app)
              .post('/scores')
              .type('application/json')
              .send(JSON.stringify(testScore))
              .expect(201)
              .then(res => {
                return supertest(app)
                  .get('/scores')
                  .expect(200)
                  .expect(res => {
                    expect(testHelper.checkScore(testScore,res.body)).to.be.true
                  })
              })
          })
      })
    })
  })

  describe('POST /auth', () => {

    beforeEach('add scores', () => testHelper.insertScores(db,testScores))
    beforeEach('add auth', () => testHelper.insertAuth(db,testAuths))

    const testAuth = {
      authtoken: 'testtoken4',
      score: 105,
      points: 100
    }

    const b = true

    context('Create score', () => {
      it('score is added to the database', () => {
        return supertest(app)
          .post('/auth')
          .type('application/json')
          .send(JSON.stringify(testAuth))
          .expect(201)
          .then(r=>{
            testHelper.checkAuth(db,testAuth)
              .then(r=>{
                expect(r.length > 0).to.be.true
              })
          })
      })
    })
  })
})
