const path = require("path");

const Menu = require("menu");
const MenuItem = require("menu-item");
const Tray = require("tray");

const proxyUtils = require("./proxyUtils");

var replaceItems = [];
var appTray;

function init(app) {
	if (appTray) {
		appTray.destroy();
	}
	appTray = new Tray(path.join(__dirname, "..", "/icon.png"));
	var config = proxyUtils.getConfig();
	var menu = createMenu(config, app);
	appTray.setContextMenu(menu);
}

function createMenu(config, app) {
	var menu = new Menu();
	(config.replaces || []).forEach((replace) => {
		var item = createReplaceMenuItem(replace);
		replaceItems.push(item);
		menu.append(item);
	});
	menu.append(new MenuItem({
		type: "separator"
	}));
	menu.append(new MenuItem({
		label: "Start proxy",
		click: () => proxyUtils.startProxy()
	}));
	menu.append(new MenuItem({
		label: "Stop proxy",
		click: () => proxyUtils.stopProxy()
	}));
	menu.append(new MenuItem({
		type: "separator"
	}));
	menu.append(new MenuItem({
		label: "Exit",
		click: () => app.quit()
	}));
	return menu;
}

function createReplaceMenuItem(replace) {
	return new MenuItem({
		label: replace.name,
		type: "checkbox",
		checked: !replace.disabled,
		click: (menuItem) => {
			toggleReplace(replace, !menuItem.checked);
		}
	});
}

function toggleReplace(replace, disabled) {
	proxyUtils.updateReplace(Object.assign({}, replace, {
		disabled
	}));
}

module.exports.init = init;
