var StaticServer = require('static-server');
var server = new StaticServer({
  port: 3000,
  rootPath: '.',            // required, the root of the server file tree
  cors: '*'                 // optional, defaults to undefined 
});
 
server.start(function () {
  console.log('Server listening to', server.port);
});