import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Component from "../Component";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Event from "sap/ui/base/Event";
import Context from "sap/ui/model/odata/v4/Context";
import StandardListItem from "sap/m/StandardListItem";
import Fragment from "sap/ui/core/Fragment";
import Dialog from "sap/m/Dialog";
import DateTimePicker from "sap/m/DateTimePicker";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding"; //Hvis det går galt V2

/**
 * @namespace com.gavdilabs.StepX.controller
 */
export default class Registration extends BaseController {
    timedialog: any;
    selectedObject: any;

    onInit(): void {
        this.getRouter().getRoute("register").attachPatternMatched(this._onPatternMatched, this);
    }

    private _onPatternMatched() {
        const controlModel = this.getOwnerComponent().getControlModel();
        console.log(controlModel);
        this.getView().bindElement(`/Users('${controlModel.getProperty("/username")}')`, {expand: "projects"});
    }

    async onListItemPress(ev: Event) {
        let src = ev.getSource() as StandardListItem;
        let binding = src.getBindingContext().getObject() as any;
        this.selectedObject = binding;
        if (!this.timedialog) {
            this.timedialog = (await this.loadFragment({ name: "com.gavdilabs.StepX.view.fragments.timedialog"})) as Dialog;
        }
        this.timedialog.bindElement(`/Projects(${binding.projectId})`);
        this.timedialog.open();
    }

    onPressSubmit(ev: Event) {
        const model = this.getModel();
        const sdPicker = this.byId("DTPStart") as DateTimePicker;
        const edPicker = this.byId("DTPEnd") as DateTimePicker;

        const sdValue = sdPicker.getDateValue();
        const edValue = edPicker.getDateValue();

        if (!sdValue || !edValue) {
            alert("Please select both start and end time");
            return;
        }

        let payload = {
            userName: this.selectedObject.userName,
            projectId: this.selectedObject.projectId,
            startTime: sdValue,
            endTime: edValue,
            changeInf: "",
        } as object;
        const workHourSet = model.bindList("/workHours") as ODataListBinding;
        workHourSet
            .create(payload)
            .created()
            .then(res => {
                this.timedialog.close();
            });
    }

    onPressCancel(ev: Event) {
        this.timedialog.close();
    }
}
