import { POST, PUT, GET } from "./cosntants";
import { RequestFactory } from "./request-factory";

export class RequestFactoryProxy {
    constructor() {
        this.requestFactory = new RequestFactory();
        this.getRequest = this.requestFactory.create(GET);
        this.putRequest = this.requestFactory.create(PUT);
        this.postRequest = this.requestFactory.create(POST);

        // this.getRequestProxy = new Proxy(this.getRequest1, {});
        // this.putRequestProxy = new Proxy(this.putRequest, {});
        // this.postRequestProxy = new Proxy(this.postRequest, {});
    }

    callGetRequest(endpoint, queryParams) {
        logRequest(GET, endpoint, queryParams);
        console.log("this.getRequest", this.getRequest);
        return this.getRequest.makeRequest(endpoint, queryParams);
    }

    callPostRequest(endpoint, queryParams) {
        logRequest(POST, endpoint, queryParams);
        return this.postRequestProxy.makeRequest(endpoint, queryParams);
    }

    callPutRequest(endpoint, queryParams) {
        logRequest(PUT, endpoint, queryParams);
        return this.putRequestProxy.makeRequest(endpoint, queryParams);
    }
}

function logRequest(type, endpoint, queryParams) {
    console.log(`Performing ${type} request with`);
    console.log("endpoint: ", endpoint);
    console.log("queryParams: ", queryParams);
}
