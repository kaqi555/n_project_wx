export const formatDayTime = (val) => {
	console.log(val)
	let date
	if(val) {
		date = new Date(val);
	} else {
		date = new Date();
	}
		let Y = date.getFullYear();
		let M = date.getMonth() + 1;
		let D = date.getDate();

		if (M < 10) {
			M = '0' + M;
		}
		if (D < 10) {
			D = '0' + D;
		}
		return Y + '-' + M + '-' + D;
}