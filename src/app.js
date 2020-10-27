require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser');
const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler')
const wamdbRouter = require('./wamdb/wamdb-router')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(cors())
app.use(helmet())

app.use(wamdbRouter)

app.get('/', (req, res) => {
  res.send('Whack a mole... 3d!')
})

app.use(errorHandler)

module.exports = app