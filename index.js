const http = require('http')
const url = require('url')
var projects = require('./data-store');


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    return handleFindReq(req, res)
  }
})

function handleFindReq(req, res) {
  const { pathname } = url.parse(req.url)
  const myArray = pathname.split("/");
  const ID=myArray[2]
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  if (myArray[1] != 'projects') {
    res.statusCode=404;
    res.end(`{ "message" : "Invalid Route"}`)

  } else if(myArray[1] == 'projects' && ID != "") {
    const foundUser = projects.filter(usr => usr.id == ID);
    if (foundUser.length != 0) {res.end(`${JSON.stringify(foundUser)}`)}
    else {
      res.statusCode=404;
      res.end(`{ "message" : "No user Exist"}`)
    }
  }
  else {
    res.statusCode=400;
    res.end(`{ "message" : "BAD REQUEST"}`)
  }
}


server.listen(8000, () => {
  console.log('Server listening on port 8000');
})