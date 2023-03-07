import UIComponent from "sap/ui/core/UIComponent";
import { support } from "sap/ui/Device";
import JSONModel from "sap/ui/model/json/JSONModel";
import models from "./model/models";

/**
 * @namespace com.gavdilabs.StepX
 */
export default class Component extends UIComponent {

	public static metadata = {
		manifest: "json"
	};

	private contentDensityClass : string;
	private controlModel: JSONModel;

	public init() : void {
		// call the base component's init function
		super.init();

		this.setModel(models.createDeviceModel(), "device");

		// create the views based on the url/hash
		this.getRouter().initialize();
	}

	/**
	 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
	 * design mode class should be set, which influences the size appearance of some controls.
	 *
	 * @public
	 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
	 */
	public getContentDensityClass() : string {
		if (this.contentDensityClass === undefined) {
			// check whether FLP has already set the content density class; do nothing in this case
			if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
				this.contentDensityClass = "";
			} else if (!support.touch) { // apply "compact" mode if touch is not supported
				this.contentDensityClass = "sapUiSizeCompact";
			} else {
				// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
				this.contentDensityClass = "sapUiSizeCozy";
			}
		}
		return this.contentDensityClass;
	}


	// A control model which parses the username and saves the data from that user no matter where in the application. 
	public getControlModel(): JSONModel{
		if (!this.getModel("control")) {
			const schema = {
				Username: "",
			};
			this.controlModel = new JSONModel(schema);
			this.controlModel.setDefaultBindingMode("TwoWay");
			this.setModel(this.controlModel, "Control");
		}
		return this.getModel("Control") as JSONModel;
	}

}
