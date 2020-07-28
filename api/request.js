const request = (config) => {
	// 处理 apiUrl
	config.url = 'https://www.hut-idea.top' + config.url;
	if(!config.data){
		config.data = {};
	}
	console.log(config)
	//console.log(JSON.stringify(config.data));
	let promise = new Promise(function(resolve, reject) {
		uni.request(config).then(responses => {
			// 异常
			if (responses[0]) {
				reject({message : "网络超时"});
			} else {
				console.log(responses)
				let response = responses[1].data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res,这样只返回一个data
				resolve(response);
			}
		}).catch(error => {
			reject(error);
		})
	})
	return promise;
};

export default request;

