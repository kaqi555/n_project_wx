import request from '@/api/request.js'

function getGrade(data) {
	return request ({
		method: 'GET',
		url: '/api/hut/grad',
		data:  data
	})
}

function getClass(data) {
	return request ({
		method: 'GET',
		url: '/api/hut/build',
		data:  data
	})
}

function getFreeRoom(data) {
	return request ({
		method: 'GET',
		url: '/api/hut/classroom',
		data:  data
	})
}

function getTime(data) {
	return request ({
		method: 'GET',
		url: '/api/hut/curtime',
		data:  data
	})
}

function getTest(data) {
	return request ({
		method: 'GET',
		url: '/api/hut/exame',
		data:  data
	})
}

function getClassSchedule(data) {
	return request ({
		method: 'GET',
		url: '/api/hut/course',
		data:  data
	})
}

function getPersonalInfo(data) {
	return request ({
		method: 'GET',
		url: '/api/user',
		data:  data
	})
}

function getPersonalFans(data) {
	return request ({
		method: 'GET',
		url: '/api/attention',
		data:  data
	})
}

function getPersonalAttention(data) {
	return request ({
		method: 'GET',
		url: '/api/attention/v',
		data:  data
	})
}

function addAttention(data) {
	return request ({
		method: 'POST',
		url: '/api/attention',
		header: {
		'content-type':	'application/x-www-form-urlencoded',
		},
		data:  data
	})
}

function deleteAttention(data) {
	data._method = 'delete'
	return request ({
		method: 'POST',
		url: '/api/attention',
		header: {
		'content-type':	'application/x-www-form-urlencoded',
		},
		data:  data
	})
}

function reviseUserInfo(data) {
	let newurl =  '/api/user/' + data.id
	return request ({
		method: 'POST',
		url: newurl,
		header: {
		'content-type':	'application/x-www-form-urlencoded',
		},
		data:  data
	})
}
export default {
	getGrade,
	getClass,
	getFreeRoom,
	getClassSchedule,
	getTime,
	getTest,
	getPersonalInfo,
	getPersonalFans,
	getPersonalAttention,
	addAttention,
	deleteAttention,
	reviseUserInfo
}