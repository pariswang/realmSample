'use strict';
const Realm = require('realm');

const realm = new Realm({
	schema: [{
		name:'Dog',
		properties:{name:'string'}
	},{
		name: 'Person',
		properties:{name:'string'}
	}],
	schemaVersion: 1,
});

module.exports = realm;