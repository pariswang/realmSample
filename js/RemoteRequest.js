'use strict';
var {Alert} = require('react-native');

const realm = require('./Realm.js');

const authToken = null;
const unAuthList = [
	''
];

function RemoteRequest(params,success, fail){
	if(typeof(params)=='function'){
		fail=success;
		success=params;
		params = {};
	}
	
	if( unAuthList.indexOf( params.action ) <= -1 ){
		if( authToken == null ){
			// TODO: 登陆界面
			Alert.alert('未登录','需要登录')
			return;
		}
		params.auth = authToken;
	}
	
	let url = 'http://www.dingla.com/api/v1/';
	if( params.action ){
		url += params.action;
		delete params.action;
	}
	
	fetch(url,{
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params)
	})
	.then(function(res){
		if( !res.ok ){
			// network err
			// TODO: alert
			Alert.alert('网络错误','网络错误，请检查您的网络是否连通。')
			throw 'Newtork Err!';
		}
		
		try{
			res = JSON.parse(res._bodyText);
		}catch(e){}
		
		if( typeof(res.err) == 'undefined'){
			// TODO: 
			throw 'Parse Err';
		}
		
		if(res.err){
			if(res.err==1){
				// TODO: 登陆
			}
			if(res.err==2){
				// TODO: 权限
			}
			// business err
			throw res.err;
		}
		//write to realm
		// TODO: 
		
		return res;
	})
	.then(success).catch(fail);
}

module.exports = RemoteRequest;