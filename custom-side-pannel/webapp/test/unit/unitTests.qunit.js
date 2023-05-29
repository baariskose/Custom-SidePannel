/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"smodsidepannel/custom-side-pannel/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
