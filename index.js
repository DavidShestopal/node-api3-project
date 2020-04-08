//included server.js file and set up the server port

const server = require('./server.js');

server.listen(5000, () => {
  console.log('\n* Server Running on http://localhost:5000 *\n');
});
