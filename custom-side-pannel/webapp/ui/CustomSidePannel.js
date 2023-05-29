sap.ui.define([
    "sap/ui/core/Control",
	"sap/m/MessageToast"
], function (
    Control,MessageToast
) {
    "use strict";

    return Control.extend("smod.sidepannel.customsidepannel.ui.CustomSidePannel", {

        metadata: {
            properties: {
                expanded:{ bindable: "false", type: "boolean", defaultValue: "false"},
                expandedWtext:{ bindable: "false", type: "boolean"},
                selectedItem:{
                    type: "smod.sidepannel.customsidepannel.ui.CustomSidePannelItem",
                    multiple:"false", 
                    bindable:"false",
                    defaultValue: null,
                }
            },
            aggregations: {
                _expandButton: { type: "sap.m.Button", multiple: false },
                _closeContentButton :{ type: "sap.m.Button", multiple: false },
                content: {
                    type: "sap.ui.core.Control"
                },
                items:{
                    type: "smod.sidepannel.customsidepannel.ui.CustomSidePannelItem",
                    multiple:"true",
                    singularName:"item",
                },
               

            },
            defaultAggregation: "content",
            events: {
            },
        },
        init: function () {

            var oEB = new sap.m.Button({
                icon: "sap-icon://navigation-left-arrow",
                type: "Default",
                tooltip: "Expand/Collapse",
                press: this.expandToggle.bind(this),
              });
              var oCEB = new sap.m.Button({
                icon: "sap-icon://decline",
                type: "Transparent",
                tooltip: "Close",
                press: this.closeContent.bind(this),
              });
              var oSI = new smod.sidepannel.customsidepannel.ui.CustomSidePannelItem();
            var sLibraryPath = jQuery.sap.getModulePath("smod.sidepannel.customsidepannel"); //get the server location of the ui library
            jQuery.sap.includeStyleSheet(sLibraryPath + "/ui/CustomSidePannel.css");

            this.setAggregation("_expandButton", oEB);
            this.setAggregation("_closeContentButton", oCEB);
            this.setSelectedItem(oSI) ;
        },
        
        expandToggle: function(){
            MessageToast.show("qsss");
            var bCurrExpanded = this.getExpanded();
            this.setExpanded(!bCurrExpanded);
        },
        closeContent: function(){
          
            this.setExpandedWtext(false);
            this.getItems().forEach(item =>{
				item.setProperty("isSelected",false);
			})
        },
        renderer: function (oRm, oControl) {
            var oEB = oControl.getAggregation("_expandButton");
            var oCEB = oControl.getAggregation("_closeContentButton");
            var bExpanded = oControl.getExpanded();
            var bExpandedWtext = oControl.getExpandedWtext();
            oRm.openStart("div");// <div main
            oRm.writeControlData(oControl);
            oRm.class("smod-sidepannel");
            oRm.openEnd();// >


            oRm.openStart("div"); // sapFSPMain
            oRm.class("smod-sapFSPMain");
            oRm.attr("data-sap-ui-fastnavgroup","true");
            oRm.openEnd();// >
            oRm.close("div"); //  end sapFSPMain

            oRm.openStart("aside"); // sapFSPSide
            oRm.attr("data-sap-ui-fastnavgroup","true");
            oRm.class("smod-FSPSide");
            oRm.style("width", "20rem");
            oRm.style("min-width", "15rem");
            oRm.style("max-width", "1083px");
            oRm.openEnd();// >

                oRm.openStart("div") // sapFSPSideHeader
                oRm.class("smod-FSPSideHeader");
                oRm.openEnd();// >
                oRm.close("div"); // header close


                oRm.openStart("div"); // sapFSPSideInner
                oRm.class("smod-FSPSideInner");
                //bExpandedWtext ? oRm.style("width","100%"):oRm.style("width","30%");
                bExpanded ? oRm.style("width","100%"):oRm.style("width","30%");
                oRm.openEnd();// >

                    oRm.openStart("div"); // sapFSPSideActionBar
                    oRm.class("smod-FSPSideActionBar");
                    bExpanded ? oRm.style("width","100%"):oRm.style("width","30%");
                    bExpandedWtext ? oRm.style("width","0%"):oRm.style("width","100%");
                    oRm.openEnd();// >
                        oRm.openStart("div"); // FSPSideActionBarHeader
                        oRm.class("smod-FSPSideActionBarHeader");
                       
                        oRm.openEnd();// >
                        oRm.renderControl(oEB);
                        oRm.close("div"); //</div> FSPSideActionBarWrapper end

                        oRm.openStart("div"); // FSPSideActionBarWrapper
                        oRm.class("smod-FSPSideActionBarWrapper");
                        oRm.openEnd();// >
                            oRm.openStart("ul") // <ul
                            oRm.class("smod-FSPSideActionBarWrapper-list");
                            oRm.openEnd();// >
                            $(oControl.getItems()).each(function(key,value){
                                oRm.renderControl(value); // this content içindekiler 
                                
                            });
                            oRm.close("ul"); //</ul>
                        oRm.close("div"); //</div> FSPSideActionBarWrapper end
                    oRm.close("div"); //</div> sapFSPSideActionBar end

                    oRm.openStart("div"); // FSPSideContent
                    oRm.class("smod-FSPSideContent");
                    bExpandedWtext ? oRm.style("visibility","visible"):oRm.style("visibility","hidden");
                    bExpanded ? oRm.style("border-right","0.0625rem solid #d9d9d9"):oRm.style("visibility","hidden");
                   
                    oRm.attr("data-sap-ui-fastnavgroup","true");
                    oRm.openEnd();// >
                    
                        oRm.openStart("div"); // FSPSideContentHeader
                        oRm.class("smod-FSPSideContentHeader");
                        oRm.openEnd();// >
                        oControl.getExpandedWtext() ? oRm.icon(oControl.getSelectedItem().getProperty("icon")): "";
                        oControl.getExpandedWtext() ? oRm.text(oControl.getSelectedItem().getProperty("text")):"";
                            oRm.openStart("div");
                            oRm.class("smod-FSPSideContentHeader-ShowButton");
                            oRm.openEnd();// >
                            oControl.getExpandedWtext() ? oRm.renderControl(oCEB):"";
                            oRm.close("div") //</div> FSPSideContentHeader end
                        oRm.close("div") //</div> FSPSideContentHeader end
                       
                        oRm.openStart("div"); // FSPSideContentInner
                        oRm.class("smod-FSPSideContentInner");

                        oRm.openEnd();// >
                        oControl.getExpandedWtext() ?  $(oControl.getSelectedItem().getContent()).each(function(key,value){
                            oRm.renderControl(value); // this content içindekiler 
                        }):" "; 
                        
                       
                        oRm.close("div") //</div> FSPSideContentInner end

                    oRm.close("div"); //</div> sapFSPSideToolbar end



                oRm.close("div"); //</div> sapFSPSideInner end


            oRm.close("div"); //</div>  sapFSPSide end


            oRm.close("div"); //</div> main end
        },
        onAfterRendering: function() {
            //if I need to do any post render actions, it will happen here
            if(sap.ui.core.Control.prototype.onAfterRendering) {
                 sap.ui.core.Control.prototype.onAfterRendering.apply(this,arguments); //run the super class's method first
            }
       },
    });
});