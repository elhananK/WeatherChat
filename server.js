var express = require('express');
var app = express();
app.listen(1234);


app.use(express.static('public'));
app.use(express.static('node_modules'));