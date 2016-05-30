const path = require("path");
const url = require("url");

const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;

function show() {
	const win = new BrowserWindow({
		show: false
	});
	var pathname = path.join(__dirname, "..", "pages", "index.html");
	win.loadURL(url.format({
		protocol: "file",
		pathname
	}));
	win.show();
}

module.exports.show = show;
