const fs = require("fs");
const path = require("path");

const urlreplace = require("url-replace");

var CONFIG_PATH = path.join(process.env.HOME, ".proxyrc.json");

function updateProxy() {
	urlreplace.reloadConfig();
}

function startProxy() {
	urlreplace.startProxy();
}

function stopProxy() {
	urlreplace.stopProxy();
}

function getConfig() {
	var config;
	try {
		config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
	} catch (e) {
		console.error(e.message);
	}
	return config;
}

function setConfig(config) {
	try {
		fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, "    "));
	} catch (e) {
		console.error(e.message);
	}
}

function updateReplace(updatedReplace) {
	var config = getConfig();
	config.replaces = config.replaces.map(function(replace) {
		if (replace.name === updatedReplace.name) {
			return updatedReplace;
		}
		return replace;
	});
	setConfig(config);
}


module.exports = {
	updateReplace,
	getConfig,
	setConfig,
	startProxy,
	updateProxy,
	stopProxy
};
