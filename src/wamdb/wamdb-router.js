const express = require('express')
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

module.exports = wamdbRouter