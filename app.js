/* 
Note: I left off on video 6.11 Refactoring Our Routes 
*/
const fs = require('fs')
const express = require("express");
const app = express();

/*
app.get("/", (req, res) => {
	console.dir(req.path);
loader.js
	res
	.status(200)
	.send("Hello from Server");
});

// .json method automatically sets content-type to application/json
app.get("/j", (req, res) => {
	console.dir(req.path);

	res
	.status(200)
	.json({ message : 'Hi from me', app: 'your server' });
});

app.post("/j", (req, res) => {
	console.dir(req.path);
	
	res
	.status(200)
	.send('You can post to this endpoint\n');
});
*/
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`))

app.get("/api/v1/tours", (req, res) => {
	console.dir(req.path);
	
	res
	.status(200)
	.json({
		status: 'success',
		results: tours.length,
		data: tours 
	});
});

app.post("/api/v1/tours", (req, res) => {
	console.dir(req.path);
	console.log(req.body);

	const newId = tours[tours.length-1].id + 1;
	const newTour = Object.assign({id: newId}, req.body);
	tours.push(newTour);
	fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), err => {
		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour
			}
		})
	})
});

app.get("/api/v1/tours/:id", (req, res) => {
	console.dir(req.path);
	console.log(req.params);
	const id = req.params.id * 1; 
	
	const tour = tours.find(el => el.id === id);
	//if(id > tours.length){
	if(!tour){
		return res.status(404).json({ 
			status: 'fail',
			message: 'Invalid ID'
		})
	}
	res
	.status(200)
	.json({
		status: 'success',
		data: tour
	});
});

app.patch('/api/v1/tours/:id', (req, res) => {
	console.dir(req.path);
	if(req.params.id * 1 > tours.length){		
		return res.status(404).json({ 
			status: 'fail',
			message: 'Invalid ID'
		})
	}
	res.status(200).json({
		status: 'success',
		data: {
			tour: '<updated tour here..>'
		}
	})
})

app.delete('/api/v1/tours/:id', (req, res) => {
	console.dir(req.path);
	if(req.params.id * 1 > tours.length){		
		return res.status(404).json({ 
			status: 'fail',
			message: 'Invalid ID'
		})
	}
	res.status(204).json({
		status: 'success',
		data: null
	})
})

app.get("*", (req, res) => {
	console.dir(req.path);
	res.end();
});

port = 3000
app.listen(port, () => {
	console.log(`App running on port ${port}`);
});



