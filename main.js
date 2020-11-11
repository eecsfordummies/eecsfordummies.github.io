const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(__dirname));
app.use("/scripts",  express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});

app.listen(3000, () => console.log('Gator app listening on port 3000!'));
