import {makeAutoObservable} from "mobx";

export default class RequestStore {
    constructor() {
        this._requests = []
        makeAutoObservable(this)
    }


    setRequests(requests) {
        this._requests = requests
    }

    get requests() {
        return this._requests
    }

    updateRequests(request) {
        console.log(request)
        console.log(this.requests)
        const index = this._requests.findIndex(requests => requests.id === request.id);
        console.log(index)
        if (index !== -1) {
            this._requests[index] = request;
        }
        console.log(this._requests)
    }
}