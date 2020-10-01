const express = require('express')
const app = express()
const port = 3000

const foo = "a big house, five car garage"

//https://dog.ceo/api/breeds/image/random

app.get('/', (req, res) => 
	res.send(`Hello World!\n <p>So ya wanna be a rap supastar? and live large? ${foo} </p>\n`); 
)

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


