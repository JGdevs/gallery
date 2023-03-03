'use strict';

require('dotenv').config();
	
const express = require('express'),

mongoose = require('mongoose'),

bodyParser = require('body-parser'),

{Transform} = require('stream'),

port = (process.env.PORT || 4069),

//conectandose con mongo

Schema = mongoose.Schema,

ImagesSchema = new Schema ({

	CreateDate:'string',
	name:'string',
	src:'string',
	size:'number',
	type:'string'

},{colletion:'images'}),

TrashSchema = new Schema ({

	CreateDate:'string',
	DeleteDate:'string',
	name:'string',
	src:'string',
	size:'number',
	type:'string',

},{collection:'trash'}),

trashConn = mongoose.model('trash',TrashSchema),

conn = mongoose.model('images',ImagesSchema);

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI);

//fin conexion mongo

//configurando app

const app = express();

app.set('port',port);

app.use(bodyParser.json({limit:'50mb'}));

app.use(bodyParser.urlencoded({extended:false,limit:'50mb'}));

app.use((req,res,next) => {

	res.header({'Access-Control-Allow-Origin': '*'});

	res.header({'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'});

	res.header({'Access-Control-Allow-Headers': '*'});

	if(req.method === 'OPTIONS') res.sendStatus(200);
	else next();

})

app.get('/Search/:filter/:search',(req,res,next) => {

	let {filter,search} = req.params;

	switch(filter) {

		case 'name' : {

			conn.find().exec((err,docs) => {

				if (err) throw err

				const result = docs.filter((image) => image[filter].toLowerCase().includes(search.toLowerCase()));

				res.writeHead(200,{'content-type':'application/json'});	

				res.end(JSON.stringify(result));				

			});

			break;

		}

		case 'date' : {

			search = search.replaceAll('-','/');

			conn.find().exec((err,docs) => {

				const result = docs.filter((image) => image.CreateDate.includes(search.slice(0,search.indexOf('.'))));

				res.writeHead(200,{'content-type':'application/json'});

				res.end(JSON.stringify(result));

			});

			break;

		}

		case 'type' : {

			conn.find({type:search}).exec((err,docs) => {

				res.writeHead(200,{'content-type':'application/json'});

				res.end(JSON.stringify(docs));

			});

			break;

		}	

	} 

});

app.get('/Page/:n',(req,res,next) => {

	let {n} = req.params;

	if(n == null) n = 9

	let range = ((n * 9) - 9),

	hasMore;

	conn.count().exec((err,total) => hasMore = (total > n * 9) ? true : false);

	conn.find().skip(range).limit(9).exec((err,docs) => {

		if (err) throw err

		res.writeHead(200,{'content-type':'aplication/json'});	

		res.end(JSON.stringify({docs,hasMore}));

	});

});

app.get('/infinite/:n',(req,res,next) => {

	let {n} = req.params;

	const transformData = new Transform({objectMode:true});

	transformData.isWritten = false;

	transformData._transform = function (chunk,encoding,callback) {

		if(!this.isWritten) {

			this.isWritten = true;

			callback(null, '[' + JSON.stringify(chunk));

		}

		else callback(null, ',' + JSON.stringify(chunk));

	}

	transformData._flush = function(callback) {

		callback(null,']');

	}

	const stream = conn.find().skip(n).limit(9).cursor().pipe(transformData);

	stream.pipe(res);

});

app.get('/Papelera',(req,res,next) => {

	trashConn.find().exec((err,docs) => {

		if (err) throw err

		res.writeHead(200,{'content-type':'application/json'});	

		res.end(JSON.stringify(docs));

	});

});

app.post('/',(req,res,next) => {

	try {for (let image of req.body) conn.create(image,err => {if (err) throw err})}

	catch(err) {console.log(err)}

	res.sendStatus(200);

});

app.delete('/',(req,res,next) => {

	try {

		conn.findOneAndDelete({_id:req.body._id}).exec((err) => {

			if(err) throw err;

			const response = {

				err:false,

			}

			delete req.body._id;

			trashConn.create(req.body,err => {if (err) throw err});

			res.writeHead(200,{'content-type':'application/json'});

			res.end(JSON.stringify(response));

		});

	}

	catch(err) { console.log(err);}

});

app.delete('/Papelera',(req,res,next) => {

	try {

		trashConn.findOneAndDelete({_id:req.body._id}).exec((err) => {

			if(err) throw err;

			const response = {

				err:false,

			}

			res.writeHead(200,{'content-type':'application/json'});

			res.end(JSON.stringify(response));

		});

	}

	catch (err) {console.log(err);}

});

app.delete('/restore',(req,res,next) => {

	try {

		trashConn.findOneAndDelete({_id:req.body._id}).exec(err => {

			if(err) throw err;

			const response = {

				err:false,

			}

			delete req.body._id

			conn.create(req.body,err => {if (err) throw err});

			res.writeHead(200,{'content-type':'application/json'});

			res.end(JSON.stringify(response));

		});

	}

	catch (err) { console.log(err);}

});

app.listen(app.get('port'),() => {

	console.log(`Iniciando express en el puerto ${app.get('port')}`);

});

module.exports = app;