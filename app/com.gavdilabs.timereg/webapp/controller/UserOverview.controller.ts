import StandardListItem from "sap/m/StandardListItem";
import BaseController from "./BaseController";
import Event from "sap/ui/base/Event"
import Dialog from "sap/m/Dialog"

/**
 * @namespace com.gavdilabs.timereg.controller
 */
export default class userOverview extends BaseController {
    workschedule: any;
    selectedObject: any;

	public onInit() : void {
	
        this.getRouter().navTo("main");
		
	}

    async onWorkSchedulePress(ev: Event) {
        let src = ev.getSource() as StandardListItem;
        let binding = src.getBindingContext().getObject() as any;

        this.selectedObject = binding;
        if(!this.workschedule) {
            this.workschedule = (await this.loadFragment({name: "com.gavdilabs.timereg.view.fragments.workschedule"})) as Dialog;
        }
        this.workschedule.open();

    } 

}
