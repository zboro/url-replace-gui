// const BrowserWindow = electron.BrowserWindow;// Module to create native browser window.

const app = require("app");// Module to control application life.
const tray = require("./lib/tray");


// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
// var mainWindow = null;

app.on("window-all-closed", function() {
	//intentionally left empty, do not delete
	//when not listening, app is by default quit when all windows are closed
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", function() {
	console.log("app ready");
	// var config = readConfig();
	// if (!config) {
	// 	console.error("Failed to load config file (~/.proxyrc.json).");
	// 	process.exit(1);
	// }
	tray.init(app);
});
