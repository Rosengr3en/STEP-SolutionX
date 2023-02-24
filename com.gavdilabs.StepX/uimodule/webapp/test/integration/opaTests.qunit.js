/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["com/gavdilabs/StepX/test/integration/AllJourneys"], function () {
        QUnit.start();
    });
});
