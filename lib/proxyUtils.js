const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

var urlreplace;

var CONFIG_PATH = path.join(process.env.HOME, ".proxyrc.json");

function updateProxy() {
	stopProxy();
	startProxy();
}

function startProxy() {
	stopProxy();
	urlreplace = child_process.spawn("url-replace");
	urlreplace.stdout.on("data", data => {
		console.log(`urlreplace stdout: ${data}`);
	});

	urlreplace.stderr.on("data", data => {
		console.log(`urlreplace stderr: ${data}`);
	});

}

function stopProxy() {
	urlreplace && urlreplace.kill("SIGINT");
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
		updateProxy();
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

function watchConfig(callback) {
	fs.watch(CONFIG_PATH, "utf8", () => {
		updateProxy();
		callback();
	})
}

module.exports = {
	updateReplace,
	getConfig,
	setConfig,
	startProxy,
	updateProxy,
	stopProxy,
	watchConfig
};
