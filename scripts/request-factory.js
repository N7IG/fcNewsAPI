import { PutRequest, PostRequest, GetRequest } from "./requests/index";
import { POST, GET, PUT } from "./cosntants";

export class RequestFactory {
    constructor() {}

    create(method) {
        switch (method) {
            case PUT:
                return new PutRequest();
            case GET:
                return new GetRequest();
            case POST:
                return new PostRequest();
        }
    }
}
