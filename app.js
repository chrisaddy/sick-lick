const express = require('express')
const weather = require('weather-js');
const compression = require('compression');


const app = express()


app.get('/', (req, res) => {
  const cityWeather = weather.find({search: 'Philadelphia, PA', degreeType: 'F'}, function(err, result) {
    if(err) console.error(err);
    const city = result[0]
    console.log(JSON.stringify(city, null, 2));
    res
      .set('x-powered-by', 'cyclic.sh')
      .send(city)
      .end()
  });

  console.log('[hello-world] root handler called')
  return cityWeather;
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

app.use(compression());
app.use(express.static("public"));

module.exports = app
