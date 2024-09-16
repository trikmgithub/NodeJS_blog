const express = require('express')
var morgan = require('morgan')
const app = express()
const port = 3000
app.use(morgan('combined'))

app.get('/', (req, res) => {
    var a = 1;
    var b = 2;
    var result = a + b;
    res.send(`result ${result}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})