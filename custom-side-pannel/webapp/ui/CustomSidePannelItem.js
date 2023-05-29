sap.ui.define([
    "sap/ui/core/Control",
	"sap/ui/dom/jquery/getSelectedText",
	"sap/m/MessageToast",
], function(
	Control,
	getSelectedText,
	MessageToast
) {
	"use strict";

	return Control.extend("smod.sidepannel.customsidepannel.ui.CustomSidePannelItem", {

        metadata: {
			properties: {
				icon:{ bindable: true, type: "sap.ui.core.URI", defaultValue: ""},
                enabled:{ bindable: true, type: "boolean", defaultValue: true},
                key:{ bindable: true, type: "string"},
                text:{ bindable: true, type: "string",defaultValue: ""},
                textDirection: {bindable: false, type: "sap.ui.core.TextDirection", defaultValue: "Inherit"},
				isSelected:{ bindable: true, type: "bool", defaultValue: false},
			},
            aggregations: {
                content: {
                    type: "sap.ui.core.Control"
                },
                
            },
			defaultAggregation: "content",
			events: {}
		},
		init: function() {

            var sLibraryPath = jQuery.sap.getModulePath("smod.sidepannel.customsidepannel"); //get the server location of the ui library
            jQuery.sap.includeStyleSheet(sLibraryPath + "/ui/CustomSidePannelItem.css");
        },
		renderer: function(oRm, oControl) {
            oRm.openStart("li");// <button main
            oRm.writeControlData(oControl);
			oControl.getIsSelected() ?  oRm.class("smod-sidepannel-item-main-active"):oRm.class("smod-sidepannel-item-main");
            oRm.openEnd();// >
                oRm.openStart("span");// <button-icon 
                oRm.class("smod-sidepannel-item-icon");
                oRm.openEnd();// >
                oRm.icon(oControl.getIcon());
                oRm.close("span"); // close bubutton-icon 

                oRm.openStart("span");// <button-text
                oRm.class("smod-sidepannel-item-text sapUiIcon sapUiIconMirrorInRTL");
                oRm.openEnd();// >
                oRm.text(oControl.getText());
                oRm.close("span"); // close bubutton-text 
            oRm.close("li"); // close button
            
			// oRm.write("<li");
			// oRm.writeControlData(oControl);
			// oRm.write(">");
			// oRm.write("<a");
			// oRm.writeAttributeEscaped("href", oControl.getHref1());
			// oRm.write(">");
			// oRm.write("<img");
			// oRm.writeAttributeEscaped("src", oControl.getSrc1());
			// oRm.write(">");
			// oRm.write("</img>");
			// oRm.write("</a>");
			// oRm.write("</li>");
		},
		ontap: function(oEvent){
			var selectedItem = oEvent.srcControl;
			selectedItem.getParent().setSelectedItem(selectedItem);
			selectedItem.getParent().setExpandedWtext(true);
			selectedItem.getParent().setExpanded(true);
			MessageToast.show("ssss");
			selectedItem.getParent().getItems().forEach(item =>{
				item.setProperty("isSelected",false);
			})
			this.setIsSelected(true);
		},
		onAfterRendering: function(evt) {},
		
	});
});