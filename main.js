const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(__dirname));
//Serve static content for the app from the "public" directory in the application directory.

//app.use("/css", express.static(__dirname + '/csss'));

app.listen(3000, () => console.log('Gator app listening on port 3000!'));
