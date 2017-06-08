const { send } = require('micro')
const cors = require('micro-cors')()
const parse = require('urlencoded-body-parser')

const handler = async (req, res) => {
  const data = await parse(req)
  
  send(res, 200)
}

module.exports = cors(handler)
