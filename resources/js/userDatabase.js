'use strict';

let userData = {};
let userList = [];

userData.addUser = function (user) {
	userList.push(user);
};

userData.printUsers = function () {
	let userCopy = [];
	for (let i = 0; i < userList.length; i++) {
		userCopy[i] = userList[i];
	}
	return userCopy;
};

module.exports = userData;