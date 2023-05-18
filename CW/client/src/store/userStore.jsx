import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._customers = []
        makeAutoObservable(this)
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    setCustomers(customers) {
        this._customers = customers
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    get customers() {
        return this._customers
    }
}