import request from '@/api/request.js'

function getHotTalk(data) {
	return request ({
		method: 'GET',
		url: '/api/talk/hot',
		data:  data
	})
}

function getTalkGood(data) {
	return request ({
		method: 'POST',
		url: '/api/talk/good',
		header: {
		'content-type':	'application/x-www-form-urlencoded',
		},
		data: data
	})
}

function getTalkCollected(data) {
	return request ({
		method: 'POST',
		url: '/api/collect',
		header: {
		'content-type':	'application/x-www-form-urlencoded',
		},
		data: data
	})
}

function getTalkComment(data) {
	return request ({
		method: 'POST',
		url: '/api/talk/comment',
		header: {
		'content-type':	'application/x-www-form-urlencoded',
		},
		data: data
	})
}

function getNewTalks(data, page) {
	let url = '/api/talk/' + page
	return request ({
		method: 'GET',
		url: url,
		data:  data
	})
}


export default {
	getHotTalk,
	getTalkGood,
	getTalkCollected,
	getTalkComment,
	getNewTalks
}