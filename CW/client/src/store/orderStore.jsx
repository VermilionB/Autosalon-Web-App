import {makeAutoObservable} from "mobx";

export default class OrderStore {
    constructor() {
        this._orders = []
        makeAutoObservable(this)
    }


    setOrders(orders) {
        this._orders = orders
    }

    get orders() {
        return this._orders
    }

    deleteOrder (id) {
        this._orders = this._orders.filter(order => order.id !== id);

    }

    updateOrders(order) {
        const index = this._orders.findIndex(orders => orders.id === order.id);
        if (index !== -1) {
            this._orders[index] = order;
        }
    }
}