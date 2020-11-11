const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));
app.use("/scripts",  express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000, () => console.log('Gator app listening on port 3000!'));
