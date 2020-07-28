import request from '@/api/request.js'

function getToken(data) {
	return request ({
		method: 'POST',
		url: '/api/token',
		header: { 
		'content-type':	'application/x-www-form-urlencoded'},
		data:  data
	})
}

function getTokenHut(data) {
	return request ({
		method: 'POST',
		url: '/api/token/login',
		header: { 
		'content-type':	'application/x-www-form-urlencoded'},
		data:  data
	})
}

function getUserInfo(token) {
	return request ({
		method: 'GET',
		url: '/api/user/',
		data: token
	})
}

function getUserHut(token) {
	return request ({
		method: 'GET',
		url: '/api/hut/userinfo',
		data: token
	})
}

function getBaner(token) {
	return request ({
		method: 'GET',
		url: '/api/banner/',
		data: token
	})
}


export default {
	getToken,
	getTokenHut,
	getUserInfo,
	getUserHut,
	getBaner
}