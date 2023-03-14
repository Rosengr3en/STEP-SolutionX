import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Event from "sap/ui/base/Event";
import Router from "sap/ui/core/routing/Router";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Component from "../Component";


/**
 * @namespace com.gavdilabs.timereg.controller
 */

export default class Main extends BaseController {
	private formatter = formatter;
	//private router: Router;
	private component: Component;
	private _tmpUserName: String = "";
	//private _tmpPassword: String = "";
	private oModel: ODataModel;

	public onInit() {
		this.component = this.getOwnerComponent();
		this.oModel = this.getModel() as ODataModel;
	}

	async onLoginPress(ev: Event) {
		let object;
		const model = this.getModel() as ODataModel;

		//Validate that the user exists with an try/catch, if not catch an error message
		try {
			object = await model.bindContext(`/Users(${this._tmpUserName})`).requestObject();
		} catch (err: any) {
			if (err.message == "Not Found") alert("Error: User not found");
			else alert(err.message);
			return;
		}

		await this.component.getControlModel().setProperty("/Username", this._tmpUserName);
		await this.component.getControlModel().setProperty("/FirstName", object.FirstName);
		await this.component.getControlModel().setProperty("/LastName", object.LastName);

		this.component.getRouter().navTo("userOverview"); 
	}

	public onUsernameInputChange(ev: Event) {
		this._tmpUserName = ev.getParameter("value");

	}

	
}
