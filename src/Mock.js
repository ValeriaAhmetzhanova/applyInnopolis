var http = require('http');
var mockserver = require('mockserver');

http.createServer(mockserver('../tests/mocks')).listen(9001);