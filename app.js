// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')     // HTTP security

// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get("hostname")
const port = process.env.PORT || config.get("port");

// Use Express app.get() methods to configure endpoints

// declare your callback function the old way
app.get('/', function (req, res) {
  res.send('<div style="background: #00FFFF;min-height: 100vh;padding: 2%;"><h1 style="color:blue">Welcome to the default page!</h1> <br>' +
    'Try going to different URIs by adding these at the end: <br> <br>' +
    '<hr>'+
    '/hello <br>' +
    '/<b>welcome</b><br>'+
    '/greeting/chetan <br>'+
    '<hr>'+
    '<a href = "https://github.com/chetankudaravalli16/node-express-app">My Repo Link</a><br>'+
    
    
    
    '<br> <br>' +
    '<h1>Fork the source code from <a href="https://github.com/denisecase/node-express-app  "> Here </a></h1></div>'
  )
})

// or use the new arrow function syntax
// respond with text
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/greeting/:id', (req, res) => {
  res.send(`Hi ${req.params.id}, how you doing?`)
})



// Implements a Magic 8 Ball service
app.get('/welcome', (req,res) => {
  if(isEmpty(req.query)){
    res.send('<h2>Welcome to My Page</h2>')
  } 
})

// Use middleware to handle all non-managed routes (e.g. /xyz)
// https://expressjs.com/en/api.html#req.originalUrl
app.use((req, res, next) => {
  res.status(404).send(`status 404 - ${req.originalUrl} was not found`);
})

// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /hello`)
  console.log(`   Try /welcome`)
  
  console.log(`   Try /greeting/yourname`)
  
  console.log('\n Hit CTRL-C CTRL-C to stop\n')

})

// Utility to see if an object is empty or not

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// generates a random value in [low,high) 
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}