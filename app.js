const express = require('express')
const app = express()

app.get('/', (req, res) => {
  console.log('[hello-world] root handler called')
  res
    .set('x-powered-by', 'cyclic.sh')
    .send(`<h1>Hello World!</h1><p>at: ${new Date().toISOString()}</p>`)
    .end()
})

app.use('*', (req,res) => {
  console.log('[hello-world] Star handler called')
  res
    .set('x-powered-by', 'cyclic.sh')
    .set('content-type', 'application/json')
    .send(JSON.stringify({
      msg: "Thanks for playing!",
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      path: req.params[0],
      query: req.query,
      headers: req.headers,
      // cookies: req.cookies,
      env: process.env
    },null,2))
    .end()
})

module.exports = app
