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

export default {
	getGrade,
	getClass,
	getFreeRoom
}