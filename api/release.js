import request from '@/api/request.js'

function uploadImage(data) {
	return request ({
		method: 'POST',
		data: data,
		url: '/resources/upload'
	})
}

function releaseTalk(data) {
	return request ({
		method: 'POST',
		header: {
		'content-type':	'application/x-www-form-urlencoded'
		},
		data: data,
		url: '/api/talk',
		
	})
}

function  releaseStudy(data) {
	return request ({
		method: 'POST',
		header: {
		'content-type':	'application/x-www-form-urlencoded'
		},
		data: data,
		url: '/api/data/',
		
	})
}

function releaseJob(data) {
	return request ({
		method: 'POST',
		header: {
		'content-type':	'application/x-www-form-urlencoded'
		},
		data: data,
		url: '/api/job',
	})
}

function releaseBuy(data) {
	return request ({
		method: 'POST',
		header: {
		'content-type':	'application/x-www-form-urlencoded'
		},
		data: data,
		url: '/api/trans',
	})
}
export default {
	uploadImage,
	releaseTalk,
	releaseStudy,
	releaseJob,
	releaseBuy
}