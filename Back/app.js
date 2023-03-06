'use strict';

require('dotenv').config();
	
const express = require('express'),

mongoose = require('mongoose'),

{Transform} = require('stream'),

multer = require('multer'),

AWSClientS3 = require("aws-client-s3"),

port = (process.env.PORT || 4069),

//conectandose con mongo

Schema = mongoose.Schema,

ImagesSchema = new Schema ({

	createDate:{type:'Date',default:Date.now},
	name:'string',
	src:'string',
	size:'number',
	type:'string'

},{collection:'images'}),

conn = mongoose.model('images',ImagesSchema);

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI);

// configurando multer 

const storage = multer.memoryStorage(),
upload = multer({storage});

// configurando AWS S3 client 

const config = {
	region: process.env.BUCKET_REGION,
	credentials: {
		accessKeyId: process.env.ACCESS_KEY,
		secretAccessKey:process.env.SECRECT_ACCESS_KEY
	}
}

const client = new AWSClientS3(config);

//configurando app

const app = express();

app.set('port',port);

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

app.post('/Upload',upload.any('images'), async (req,res,next) => {

	try {

		let mongoData = req.files.map(file => {

			const {originalname,size,mimetype} = file;

			client.uploadFile(file.buffer,{bucket:process.env.BUCKET_NAME,key:originalname}),

			src = `${process.env.BASE_IMG_URL}/${originalname}.${mimetype}`;

			return {name:originalname,size,type:mimetype,url}
			
		});

		conn.insertMany(mongoData,err => {

			if (err) throw err;

			res.sendStatus(201);

		})

	}

	catch (err) {

		res.sendStatus(409);

	}

});

app.delete('/Delete',(req,res,next) => {

	try {

		conn.findOneAndDelete({_id:req.body._id}).exec((err) => {

			if(err) throw err;

			res.sendStatus(202)

		});

	}

	catch(err) {



	}

});

app.listen(app.get('port'),() => {

	console.log(`Iniciando express en el puerto ${app.get('port')}`);

});

module.exports = app;