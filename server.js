'use strict';

var express = require('express');
var bodyParser = require('body-parser');
/*>>>>>>=============================================<<<<<<*/

var Storage = function () {
	this.items = [];
	this.id = 0;
};

Storage.prototype.add = function (name) {
	var item = {
		name: name,
		id: this.id
	};
	this.items.push(item);
	this.id += 1;
	return item;
};

Storage.prototype.delete = function (id) {
	for (var i = 0; i < this.items.length; i++) {
		if (this.items[ i ].id == id) {
			this.items.splice(i, 1);
		}
	}
	return this.items;
};

Storage.prototype.update = function (itemName, itemId) {
	for (var i = 0; i < this.items.length; i++) {
		if (this.items[ i ].id == itemId) {
			this.items[ i ] = { name: itemName, id: itemId };
		}
	}
	return this.items;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.use(bodyParser.json())

app
	.get('/items', (req, res) => {
		res.json(storage.items);
	})
	.post('/items', (req, res) => {
		if (!req.body) {
			return res.sendStatus(400);
		}
		var item = storage.add(req.body.name);
		res.status(201).json(item);
	})
	.delete('/items/:id', (req, res) => {
		var id = req.params.id

		if (!req.body) {
			return res.sendStatus(400);
		}

		var items = storage.update(req.body.name, id);
		res.status(200).json(items);
	})
	.put('/items/:id', (req, res) => {
		if (!req.body) {
			return res.sendStatus(400);
		}

		var items = storage.update(req.body.name, req.params.id);
		res.status(201).json(items);
	});

app.listen(process.env.PORT || 3003, () => {
	console.log('App listen to 3003');
});

exports.app = app;
exports.storage = storage;
