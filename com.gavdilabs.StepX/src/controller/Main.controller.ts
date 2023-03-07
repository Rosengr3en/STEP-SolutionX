import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Component from "../Component";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Event from "sap/ui/base/Event";
import Context from "sap/ui/model/odata/v4/Context";

/**
 * @namespace com.gavdilabs.StepX.controller
 */
export default class Main extends BaseController {
	private formatter = formatter;
	private component: Component;
	private _tmpUsername: String = "";
	private oModel: ODataModel;

	onInit(){
		this.component = this.getOwnerComponent();
		this.oModel = this.getModel() as ODataModel;
	}

	async onLoginPress(ev: Event){
		let object;
		const model = this.getModel() as ODataModel;

		//Validate that the user exists
		try {
			object = await model.bindContext(`/Users('${this._tmpUsername}')`).requestObject();
		}
		catch (err: any){
			if (err.message == "not found") alert("Error: User not found");
			else alert(err.message);
			return;
		}
		

		//Set control model data
		await this.component.getControlModel().setProperty("/username", this._tmpUsername);
		await this.component.getControlModel().setProperty("/firstname", object.firstname);
		await this.component.getControlModel().setProperty("/lastname", object.lastname);

		//Navigate to registration page
		this.component.getRouter().navTo("register");
	}

	onUsernameInputChange(ev: Event){
		this._tmpUsername = ev.getParameter("value");
	}
}
