'use strict';

let createAddress = function (lat, long) {
	let xhrGoogleMap = new XMLHttpRequest();
	//Google Key: AIzaSyC0Lo0_DGek1qhb7nPS2jVsjbERmnAgVvs
	xhrGoogleMap.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyC0Lo0_DGek1qhb7nPS2jVsjbERmnAgVvs`);

	xhrGoogleMap.addEventListener('load', function () {
		console.log('load');
		let jsonData = JSON.parse(xhrGoogleMap.response);
		if (jsonData.status !== 'ZERO_RESULTS') {
			document.getElementById('address').innerText = `The Address for Lattitude: ${lat} and Longitute: ${long} is ${jsonData.results[0].formatted_address}!`;
		} else {
			document.getElementById('address').innerText = `The Address for Lattitude: ${lat} and Longitute: ${long} does not exist! :(`;
		}
	});


	xhrGoogleMap.addEventListener('timeout', function (data) {
		console.log('timeout');
		console.error(data);
	});

	xhrGoogleMap.addEventListener('error', function (data) {
		console.log('error');
		console.error(data);
	});

	xhrGoogleMap.timeout = 5 * 1000;

	xhrGoogleMap.send();
};

let mapCord = function (tweet) {
	let tweetAry = tweet.split(' ');
	let lat = tweetAry[1];
	let lng = tweetAry[2];
	console.log('NaN');
	if (!isNaN(lat) && !isNaN(lng)) {
		console.log('First');
		console.log((lat >= -90));
		if (lat >= -90 && lat <= 90) {
			console.log('Second');
			console.log(lng);
			if (lng >= -180 && lng <= 180) {
				createAddress(lat, lng);
			} else {
				let oldNode = document.getElementById('address');
				while (oldNode.lastChild) {
					oldNode.removeChild(oldNode.lastChild);
				}
				oldNode.innerText = 'Tweet doesn\'t meet requirements';
			}
		} else {
			let oldNode = document.getElementById('address');
			while (oldNode.lastChild) {
				oldNode.removeChild(oldNode.lastChild);
			}
			oldNode.innerText = 'Tweet doesn\'t meet requirements';
		}

	} else {
		let oldNode = document.getElementById('address');
		while (oldNode.lastChild) {
			oldNode.removeChild(oldNode.lastChild);
		}
		oldNode.innerText = 'Tweet doesn\'t meet requirements';
	}
};
//event listeners 

let item1 = document.getElementById('item1');
item1.addEventListener('click', function () {
	mapCord(item1.innerText);
});

let item2 = document.getElementById('item2');
if (item2) {
	item2.addEventListener('click', function () {
		mapCord(item2.innerText);
	});
}

let item3 = document.getElementById('item3');
if (item3) {
	item3.addEventListener('click', function () {
		mapCord(item3.innerText);
	});
}
let item4 = document.getElementById('item4');
if (item4) {
	item4.addEventListener('click', function () {
		mapCord(item4.innerText);
	});
}
let item5 = document.getElementById('item5');
if (item5) {
	item5.addEventListener('click', function () {
		mapCord(item5.innerText);
	});
}
let item6 = document.getElementById('item6');
if (item6) {
	item6.addEventListener('click', function () {
		mapCord(item6.innerText);
	});
}
let item7 = document.getElementById('item7');
if (item7) {
	item7.addEventListener('click', function () {
		mapCord(item7.innerText);
	});
}
let item8 = document.getElementById('item8');
if (item8) {
	item8.addEventListener('click', function () {
		mapCord(item8.innerText);
	});
}
let item9 = document.getElementById('item9');
if (item9) {
	item9.addEventListener('click', function () {
		mapCord(item9.innerText);
	});
}
let item10 = document.getElementById('item10');
if (item10) {
	item10.addEventListener('click', function () {
		mapCord(item10.innerText);
	});
}
