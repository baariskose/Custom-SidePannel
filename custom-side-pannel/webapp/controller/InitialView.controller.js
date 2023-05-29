sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
        JSONModel) {
        "use strict";

        return Controller.extend("smod.sidepannel.customsidepannel.controller.InitialView", {
            onInit: function () {
                var oModel = new JSONModel({

                    items: [
                        {
                            text: "xxxx",
                            icon: "sap-icon://physical-activity"

                        },
                        {
                            text: "yyy",
                            icon: "sap-icon://building"

                        },
                        {
                            text: "zzzz",
                            icon: "sap-icon://play"

                        }]
                });
                this.getView().setModel(oModel,"x");
            }
        });
    });
