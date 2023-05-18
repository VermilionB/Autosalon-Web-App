import {makeAutoObservable} from "mobx";
export default class ManagersStore {
    constructor() {
        this._managers = []
        makeAutoObservable(this)
    }
    setManagers(managers){
        this._managers = managers
    }
    get managers() {
        return this._managers
    }
}