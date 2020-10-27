const express = require('express')
const { v4: uuidv4 } = require('uuid')
const WAMDBService = require('./wamdb-service')

const wamdbRouter = express.Router()

const serializeScores = score => ({
    score_id: score.score_id,
    user_name: score.user_name,
    score: score.score
})

wamdbRouter
  .route('/scores')
  .get((req, res, next) => {
    WAMDBService.getAllScores(req.app.get('db'))
      .then(scores => {
        res.json(scores.map(serializeScores))
      })
      .catch(next)
  })
  .post((req, res, next) => {
    const { user_name, score, authtoken } = req.body;
    WAMDBService.addUserScore(req.app.get('db'), user_name.replace(/[^a-zA-Z0-9 ]/gi, ''), score, authtoken )
      .then(r => {
        WAMDBService.deleteAuthToken(req.app.get('db'),authtoken)
          .then(r=>{res.json(r)})
      })
      .catch(next)
  })

wamdbRouter
  .route('/scores/:user_name')
  .get((req, res, next) => {
    const { user_name } = req.params
    WAMDBService.searchScoresByUser(req.app.get('db'), user_name)
      .then(scores => {
        res.json(scores.map(serializeScores))
      })
      .catch(next)
  })
  

wamdbRouter
  .route('/auth')
  .get((req,res,next) => {
    const authtoken = uuidv4()
    WAMDBService.getAuthToken(req.app.get('db'),authtoken)
      .then(r => {
        res.json({authtoken:authtoken})
      })
      .catch(next)
  })
  .post((req, res, next) => {
    const { authtoken, score, points } = req.body;
    WAMDBService.checkAuthToken(req.app.get('db'), authtoken )
      .then(r => {
        // r should be seconds elapsed since start
        // check score(timer) against seconds elapsed
        //                    +/- like 5seconds, and greater than 90
        // then double check that points = 100
        //if ( r )

        let msg = ''

        if (!("date_part" in r)) msg += 'cheating: no date_part - likely invalid token!\n';

        const secondsElapsed = parseInt(r.date_part)
        if ( secondsElapsed < 95 ) msg += 'cheating: not enough seconds elapsed\n';

        if (Math.abs(secondsElapsed - score) >= 5) msg += 'cheating: client time != server time elapsed\n';

        if (points !== 100) msg += 'cheating: not enough points\n';

        const validate = (msg.length > 0)
        
        WAMDBService.validateAuthToken(req.app.get('db'),authtoken,validate)
          .then( r => { 
            res.json(msg) 
          })
          .catch(next)
      })
      .catch(next)
  })

module.exports = wamdbRouter