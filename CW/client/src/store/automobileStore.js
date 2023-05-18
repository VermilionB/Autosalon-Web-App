import {makeAutoObservable} from "mobx";

export default class AutomobileStore {
    constructor() {
        this._automobiles = []
        this._brands = []
        this._models = []
        this._fuelTypes = []
        this._bodyTypes = []
        this._engineLayouts = []
        makeAutoObservable(this)
    }

    setAutomobiles(data) {
        this._automobiles = data
    }

    updateAutomobile(updatedAutomobile) {
        const index = this._automobiles.findIndex(automobile => automobile.id === updatedAutomobile.id);
        if (index !== -1) {
            this._automobiles[index] = updatedAutomobile;
        }
    }

    deleteAutomobile(automobileId) {
        this._automobiles = this.automobiles.filter(automobile => automobile.id !== automobileId);
    }

    get automobiles() {
        return this._automobiles
    }

    get brands() {
        return this._brands
    }

    setBrands(data) {
        this._brands = data
    }

    get models() {
        return this._models
    }

    setModels(data) {
        this._models = data
    }

    get fuelTypes() {
        return this._fuelTypes
    }

    setFuelTypes(data) {
        this._fuelTypes = data
    }

    get bodyTypes() {
        return this._bodyTypes
    }

    setBodyTypes(data) {
        this._bodyTypes = data
    }

    get engineLayouts() {
        return this._engineLayouts
    }

    setEngineLayouts(data) {
        this._engineLayouts = data
    }

    getAutomobileById(id) {
        return this._automobiles.find(automobile => automobile.id === id);
    }

}